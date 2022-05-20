import express, { Request, Response, Router } from 'express';
// import * as rQueries from '../db/queries/01_restaurants';
// import * as tQueries from '../db/queries/02_tables';
import * as oQueries from '../db/queries/03_orders'

const ObjectId = require('mongodb').ObjectId;
const sanitize = require('mongo-sanitize')

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  // const restaurant = sanitize(req.body.restaurant)
  // const table = sanitize(req.body.table)
  // const order = sanitize(req.body.order)
  const table = "6283f6a703f54b7c82c5fffc"
  const custArr = {
    name: 'Christian', 
    sub_orders: [
      { menu_item_id: ObjectId('6283f1d9804b848eb5e45600'), quantity: 2}
    ]
  }
  
  // oQueries.createOrderByTableId(ObjectId(table), custArr)
  //   .then((data) => {
  //     res.send(data)
  //   })
});

module.exports = router;
