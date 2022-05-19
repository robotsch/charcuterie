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
import { LEGAL_TCP_SOCKET_OPTIONS } from 'mongodb';

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

const getAllNames = (sockets: any) => {
  const names = [];
  for (const clientID of sockets) {
    const socket = io.sockets.sockets.get(clientID);
    if (socket && socket.data.name !== undefined) {
      names.push(socket.data.name);
    }
  }
  return names;
};

let interval: any;
io.on('connection', (socket) => {

  let sockets: any;
  socket.data = socket.handshake.query;
  let room: string
  
  console.log(`New client connected`, socket.id);

  socket.on('SUBMIT_NAME', ({ name }) => {
    socket.data.name = name;
    room = `rst1.tbl1`;
    // room = `rst${socket.data.restaurant}.tbl${socket.data.table}`;
    io.in(socket.id).socketsJoin(room);
    const names = getAllNames(io.sockets.adapter.rooms.get(room));
    io.to(room).emit('SUBMIT_NAME', names);
  });

  socket.on('EMPLOYEE', ({restaurant}) => {
    room = restaurant
    io.in(socket.id).socketsJoin(room)
  })

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

    io.to(room).emit('SUBMIT_ORDER', fullOrder);
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected:', socket.data.name);
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
