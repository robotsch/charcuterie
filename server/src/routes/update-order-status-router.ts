import express, { Request, Response, Router } from 'express';
import * as oQueries from '../db/queries/03_orders';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  // if (req.query.id) {
  //   const table = sanitize(req.query.id);
  //   oQueries
  //     .getOrdersByTableId(ObjectId(table))
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send(`Failed to get order: ${err}`);
  //     });
  // }
});

module.exports = router;
