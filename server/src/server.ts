require('dotenv').config({ silent: true });
import express, { Request, Response } from 'express';
import cors from 'cors';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import QRcode from 'qrcode';


const app = express();

const PORT = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

declare module 'express-session' {
  export interface SessionData {
    restaurant_id: string,
    table_id: string | undefined,
    name: string | undefined,
  }
}

const clientPromise = require('./db/db')

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

// Router imports
const sessionRoute = require('./routes/table-session-router');
const customerNameRoute = require('./routes/name-input-router');

// Resource routes
app.use('/api/landing', sessionRoute);
app.use('/api/name-input', customerNameRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('test');
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
