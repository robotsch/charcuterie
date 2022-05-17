import express, { Request, Response, Router,} from 'express';

const router: Router = express.Router()

router.post("/", (req: Request, res: Response) => {
  
  const regex = /^[0-9a-zA-Z]*$/

  const customerName = req.body.name.trim()

  if(req.body.name.match(regex)){
    req.session.name = customerName
    req.session.save((error) => console.log(error));
    res.send('Success')
  } else {
    res.send('Invalid name')
  }
  
})

module.exports = router