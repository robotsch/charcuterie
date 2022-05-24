import express, { Request, Response, Router } from 'express';
import * as oQueries from '../db/queries/03_orders';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  if(req.body.id) {
    const order = sanitize(req.body.id)
    oQueries.setOrderStatusCompleteById(ObjectId(order))
      .then(() => {
        res.send('Success')
      })
      .catch((err) => {
        console.log('Failed to update order status: ', err)
      })
  } else {
    res.send('Invalid query')
  }
});

module.exports = router;
