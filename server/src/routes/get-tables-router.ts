import express, { Request, Response, Router } from 'express';
import { apiAuthCheck } from '../middleware/auth-redirects';
import * as tQueries from '../db/queries/02_tables';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

// router.get('/', apiAuthCheck, (req: Request, res: Response) => {
router.get('/', (req: Request, res: Response) => {
  // if (req.session.restaurant_id) {
  //   const restaurant = sanitize(req.session.restaurant_id);

  if (req.query && req.query.id) {
    const restaurant = sanitize(req.query.id);

    tQueries
      .getAllTablesByRestaurantId(ObjectId(restaurant))
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log('Failed to get tables: ', err);
        res.status(500).send(`Failed to get tables: ${err}`);
      });
  } else {
    res.status(500).send('Invalid query');
  }
});

module.exports = router;
