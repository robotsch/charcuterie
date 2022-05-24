import express, { Request, Response, Router } from 'express';
import * as oQueries from '../db/queries/03_orders';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (req.query && req.query.id && req.query.status) {
    const table = sanitize(req.query.id);
    const status = sanitize(req.query.status);
    oQueries
      .getOrdersByTableId(ObjectId(table), status)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(`Failed to get order: ${err}`);
      });
  }
});

module.exports = router;
