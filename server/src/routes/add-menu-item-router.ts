import express, { Request, Response, Router } from 'express';
import { apiAuthCheck } from '../middleware/auth-redirects';
import * as rQueries from '../db/queries/01_restaurants';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  // router.post('/', apiAuthCheck, (req: Request, res: Response) => {
  const data = {
    price: sanitize(req.body.price),
    name: sanitize(req.body.name),
    description: sanitize(req.body.description),
    image_url: sanitize(req.body.image_url),
    category: sanitize(req.body.category),
  };
  //  const id = sanitize(req.session.restaurant_id);
  const id = sanitize(req.body.restaurant_id);

  rQueries
    .addMenuItemByRestaurantId(ObjectId(id), data)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log('Failed to add menu item: ', err);
      res.status(500).send(`Failed to add menu item`);
    });
});

module.exports = router;
