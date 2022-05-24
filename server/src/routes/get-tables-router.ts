import express, { Request, Response, Router } from 'express';
import { apiAuthCheck } from '../middleware/auth-redirects';
import * as tQueries from '../db/queries/02_tables';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.get('/', apiAuthCheck, (req: Request, res: Response) => {
  if (req.session.restaurant_id) {
    const restaurant = sanitize(req.session.restaurant_id);
    tQueries
      .getAllTablesByRestaurantId(ObjectId(restaurant))
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(`Failed to get tables: ${err}`);
      });
  }
});

module.exports = router;
