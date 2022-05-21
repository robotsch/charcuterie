import express, { Request, Response, Router } from 'express';
import { authenticateUser } from '../utils/auth-utils'
import * as rQueries from '../db/queries/01_restaurants'

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const userData = {
    username: 'captainjack',
    password: 'password123'
  }

  // TODO: figure out how we scope this to restaurant
  authenticateUser(userData)
    .then((id) => {
      if(id) {
        req.session.employee_id = id
      }
    })
});
  // userQueries.getUserWithEmail(userData.email)
  //   .then((result) => {
  //     if (result) {
  //       authUtils.authenticateUser(userData)
  //         .then((userId) => {
  //           if (userId) {
  //             req.session.user_id = userId;
  //             res.redirect("/");
  //           } else {
  //             res.send('Incorrect email or password');
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       res.send('Incorrect email or password');
  //     }
  //   })
  //   .catch((err) => console.log(err));

module.exports = router;
