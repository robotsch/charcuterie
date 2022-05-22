import express, { Request, Response, Router } from 'express';
import * as rQueries from '../db/queries/01_restaurants';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const restaurant = sanitize(req.body.restaurant);
  const menuItem = sanitize(req.body.restaurant);

  rQueries
    .deleteMenuItemByRestaurantId(ObjectId(restaurant), ObjectId(menuItem))
    .then((res) => {
      res.send(res);
    });
});

module.exports = router;
