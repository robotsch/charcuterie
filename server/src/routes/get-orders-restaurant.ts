import { apiAuthCheck } from '@/middleware/auth-redirects';
import express, { Request, Response, Router } from 'express';
import * as oQueries from '../db/queries/03_orders';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (req.query && req.query.id) {
    const restaurant = sanitize(req.query.restaurant);

    oQueries
      .getAllOrdersByRestaurantId(ObjectId(restaurant))
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log('Failed to get orders: ', err);
        res.status(500).send(`Failed to get orders: ${err}`);
      });
  } else {
    res.status(500).send('Invalid query');
  }
});

module.exports = router;
