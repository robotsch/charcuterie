import express, { Request, Response, Router } from 'express';
import * as oQueries from '../db/queries/03_orders';

const ObjectId = require('mongodb').ObjectId;
const sanitize = require('mongo-sanitize');

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const restaurant = sanitize(req.body.restaurant);
  const table = sanitize(req.body.table);
  const orders = sanitize(req.body.order);
  const custArr = [];

  for (const name in orders) {
    const sub_orders: any[] = [];

    orders[name].forEach((item: any) => {
      sub_orders.push({
        menu_item_id: ObjectId(item.id),
        quantity: item.quantity,
      });
    });

    const orderObj = {
      name: name,
      sub_orders: sub_orders,
    };

    custArr.push(orderObj);
  }

  oQueries
    .createOrderByTableId(ObjectId(table), custArr)
    .then((dbRes) => {
      console.log(dbRes);
      res.send('Success');
    })
    .catch((err) => {
      res.status(500).send(`Failed to submit order: ${err}`);
    });
});

module.exports = router;
