import express, { Request, Response, Router,} from 'express';
import * as rQueries from '../db/queries/01_restaurants';
import * as tQueries from '../db/queries/02_tables'

const sanitize = require('mongo-sanitize');
const ObjectId = require('mongodb').ObjectId;

const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {
  
  // if(req.query.restaurant && req.query.table) {
  //   const restaurant = sanitize(req.query.restaurant)
  //   const table = sanitize(req.query.table)

  const restaurant = "6283f1d9804b848eb5e4560c"
  const table = "6283f6a703f54b7c82c5fffd"
  //   rQueries.getRestaurantsWithId
  // }
  // rQueries.getAllRestaurants()
  //   .then((data) => {
  //     console.log(data)
  //   })
  
  res.send('done')

})

module.exports = router