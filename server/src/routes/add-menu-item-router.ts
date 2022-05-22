import express, { Request, Response, Router } from 'express';
import * as rQueries from '../db/queries/01_restaurants';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {

  const data = {
    price: sanitize(req.body.price),
    name: sanitize(req.body.name),
    description: sanitize(req.body.description),
    image_url: sanitize(req.body.image_url),
    category: sanitize(req.body.category),
  };

  rQueries
    .addMenuItemByRestaurantId(ObjectId('6283f1d9804b848eb5e4560c'), data)
    .then((res) => {
      res.send(res);
    });
});

module.exports = router;
