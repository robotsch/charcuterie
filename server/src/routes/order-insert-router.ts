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
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      });
    });

    const orderObj = {
      name: name,
      sub_orders: sub_orders,
    };

    custArr.push(orderObj);
  }

  let d = new Date()
  d.setHours((d.getHours() - 4)).toLocaleString()

  oQueries
    .createOrderByTableId(ObjectId(table), custArr, ObjectId(restaurant), d)
    .then((dbRes) => {
      console.log("dbRes", dbRes);
      console.log("dbRes.insertedId", dbRes.insertedId);
      res.send(dbRes.insertedId);
    })
    .catch((err) => {
      console.log('Failed to submit order: ', err);
      res.status(500).send(`Failed to submit order: ${err}`);
    });
});

module.exports = router;
