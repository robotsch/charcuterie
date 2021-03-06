import express, { Request, Response, Router } from 'express';
import { authenticateUser } from '../utils/auth-utils';

const sanitize = require('mongo-sanitize');

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { username, password } = sanitize(req.body);

  authenticateUser(username, password)
    .then((userData) => {
      console.log(userData);
      if (userData && userData.employeeId) {
        req.session.restaurant_id = userData.restaurantId;
        req.session.employee_id = userData.employeeId;
        res.send(userData.restaurantId)
      } else {
        res.send('Incorrect id or password');
      }
    })
    .catch((err) => {
      console.log('Authentication action failed: ', err);
      res.status(500).send(`Authentication action failed: ${err}`);
    });
});

module.exports = router;
