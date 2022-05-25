import express, { Request, Response, Router } from 'express';

const sanitize = require('mongo-sanitize');

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    console.log('Could not destroy session: ', err)
  })
});

module.exports = router;
