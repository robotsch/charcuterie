import express, { Request, Response, Router } from 'express';
import { validatePassword } from '../utils/auth-utils'

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const userData = req.body

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
});

module.exports = router;
