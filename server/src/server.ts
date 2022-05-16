import express, { Request, Response } from 'express';
import cors from 'cors';
import expressSession from 'express-session'
import MongoStore from 'connect-mongo'
import morgan from 'morgan';
import bodyParser from 'body-parser'
import QRcode from 'qrcode'

const app = express();

const PORT = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('test');
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
