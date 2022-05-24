import express, { Request, Response, Router } from 'express';
import { apiAuthCheck } from '../middleware/auth-redirects';
import qrcode from 'qrcode';

const router: Router = express.Router();

router.post('/', apiAuthCheck, (req: Request, res: Response) => {
  const { table } = req.body;

  qrcode.toDataURL(
    `${process.env.CLIENT_ORIGIN}/landing?id1=${req.session.restaurant_id}&id2=${table}`,
    (err, url) => {
      res.send(url);
    }
  );
});

module.exports = router;
