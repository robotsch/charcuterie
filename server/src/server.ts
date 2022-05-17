require('dotenv').config({ silent: true });
import express, { Request, Response } from 'express';
import { createServer } from 'http'
import cors from 'cors';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import QRcode from 'qrcode';


const clientPromise = require('./db/db')

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

/**
 * ============================================================ 
 * Session setup
 * ============================================================
 */

declare module 'express-session' {
  export interface SessionData {
    restaurant_id: string,
    table_id: string | undefined,
    name: string | undefined,
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

// const server = createServer(app)
// const io = new Server(server, {

// })

// io.on('connection', (socket: any) => {
//   console.log('successful connection')
// })


// Router imports
const sessionRoute = require('./routes/table-session-router');
const customerNameRoute = require('./routes/name-input-router');

// Resource routes
app.use('/api/landing', sessionRoute);
app.use('/api/name-input', customerNameRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('test');
});

server.listen(3000, () => console.log(`Server running on ${3000}`));
