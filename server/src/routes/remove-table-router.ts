import express, { Request, Response, Router } from 'express';
import * as tQueries from '../db/queries/02_tables';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const table = sanitize(req.body.table);

  tQueries.deleteTableById(ObjectId(table)).then((res) => {
    res.send(res);
  })
  .catch((err) => {
    console.log('Failed to remove table: ', err)
    res.status(500).send(`Failed to remove table: ${err}`)
  })
});

module.exports = router;
