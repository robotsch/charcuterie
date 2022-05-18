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
    table_id: string | undefined;
    name: string | undefined;
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

  console.log(`New client connected`);

  socket.on('joinRoom', (name) => {
    socket.data.customerName = name;
    io.in(socket.id).socketsJoin(room);
    console.log(`${name} has joined room ${room}`);
  });

  socket.on('updateOrder', (order) => {
    io.to(room).emit('updateOrder', socket.data.customerName, order);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('updateOrder', (data) => {
    console.log("data in server", data);
    socket.emit('new order', data);
  });
});

//======================================

// Router imports
const sessionRoute = require('./routes/table-session-router');
const customerNameRoute = require('./routes/name-input-router');

// Resource routes
app.use('/api/landing', sessionRoute);
app.use('/api/name-input', customerNameRoute);

app.get('/', (req: Request, res: Response) => {
  res.send({ response: 'test' }).status(200);
});

server.listen(3001, () => console.log(`Server running on ${3001}`));
