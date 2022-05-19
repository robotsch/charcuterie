require('dotenv').config({ silent: true });
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import QRcode from 'qrcode';
import { Server, Socket } from 'socket.io';
import cookie from 'cookie';

const clientPromise = require('./db/db');

const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(bodyParser.json());

/**
 * ============================================================
 * Session setup
 * ============================================================
 */

declare module 'express-session' {
  export interface SessionData {
    restaurant_id: string;
    employee_id: string;
  }
}

app.use(
  expressSession({
    store: MongoStore.create({ clientPromise }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 60 * 1000,
    },
  })
);

/**
 * ============================================================
 * Socket setup
 * ============================================================
 */

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
//======================================

let interval: any;
io.on('connection', (socket) => {
  let sockets: any;
  socket.data = socket.handshake.query;
  const room = `rst${socket.data.restaurant}.tbl${socket.data.table}`;

  console.log(`New client connected`, socket.id);

  io.in(socket.id).socketsJoin(room);

  socket.on('SUBMIT_NAME', ({ name }) => {
    socket.data.name = name;
    console.log(io.sockets.adapter.rooms.get(room));
    console.log("submit name", name)
    io.to(room).emit('SUBMIT_NAME', name);
  });

  socket.on('UPDATE_ORDER', (order) => {
    io.to(room).emit('UPDATE_ORDER', socket.data.customerName, order);
  });

  socket.on('SUBMIT_ORDER', () => {
    const clientList = io.sockets.adapter.rooms.get(room);
    const fullOrder: { [key: string]: {} } = {};

    for (const clientId in clientList) {
      const clientSocket = io.sockets.sockets.get(clientId);
      if (clientSocket) {
        fullOrder[clientSocket.data.name] = clientSocket.data.order;
      }
    }

    io.to(room).emit('SUBMIT_ORDER');
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected', socket.id);
    console.log(socket.data.name);
    io.to(room).emit('USER_DISCONNECT', socket.data.name);
  });
});

//======================================

// Router imports
const menuRoute = require('./routes/menu-router');
const employeeLoginRoute = require('./routes/login-router');

// Resource routes
app.use('/api/menu', menuRoute);
app.use('/api/employee-login', employeeLoginRoute);

app.get('/', (req: Request, res: Response) => {
  res.send({ response: 'test' }).status(200);
});

server.listen(3001, () => console.log(`Server running on ${3001}`));
