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
    ])
      .then((data) => {
        const names = { restaurant: data[0].name, table: data[1] };
        res.send(names);
      })
      .catch((err) => {
        console.log('Failed to get readable names: ', err);
      });
  } else {
    res.status(500).send('Invalid query');
  }
});

router.get('/restaurant', (req: Request, res: Response) => {
  if (req.query.restaurant) {
    const restaurant = sanitize(req.query.restaurant);

    rQueries
      .getRestaurantWithId(ObjectId(restaurant))
      .then((data) => {
        res.send({ restaurant: data.name });
      })
      .catch((err) => {
        console.log('Failed to get readable names: ', err);
      });
  } else {
    res.status(500).send('Invalid query');
  }
});

module.exports = router;
