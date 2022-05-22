import express, { Request, Response, Router,} from 'express';
import { apiAuthCheck } from '../middleware/auth-redirects';
import qrcode from 'qrcode'

const router: Router = express.Router()

router.post("/", apiAuthCheck, (req: Request, res: Response) => {
  const [restaurant, table] = req.body
  
  const QR_CODE = qrcode.toDataURL(`http://localhost:3000/landing?id1=${restaurant}&id2=${table}`, (err, url) => {
    res.send(`<img src=${url}></img>`)
  })
})

module.exports = router