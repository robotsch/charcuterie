import express, { Request, Response, Router } from 'express';
import * as rQueries from '../db/queries/01_restaurants';
import * as tQueries from '../db/queries/02_tables';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (req.query.restaurant && req.query.table) {
    const restaurant = sanitize(req.query.restaurant);
    const table = sanitize(req.query.table);

    Promise.all([
      rQueries.getRestaurantWithId(ObjectId(restaurant)),
      tQueries.getTableReadableIdById(ObjectId(table)),
    ]).then((data) => {
      const names = { restaurant: data[0].name, table: data[1] };
      console.log(names)
      res.send(names);
    });
  } else {
    res.send('Invalid request')
  }
});

module.exports = router;
