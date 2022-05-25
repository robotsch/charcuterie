import express, { Request, Response, Router } from 'express';
import { apiAuthCheck } from '../middleware/auth-redirects';
import * as tQueries from '../db/queries/02_tables';
import { Console } from 'console';

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router();

router.post('/', apiAuthCheck, (req: Request, res: Response) => {
  const restaurant = sanitize(req.session.restaurant_id)
  const readable_id = req.body.readable_id;

  tQueries
    .createTableForRestoById(ObjectId(restaurant), readable_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('Failed to create table: ', err);
      res.status(500).send(`Failed to add table: ${err}`);
    });
});

module.exports = router;
