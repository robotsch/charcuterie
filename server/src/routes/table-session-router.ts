import express, { Request, Response, Router,} from 'express';

const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {

  const regex = /^[0-9a-zA-Z]{1,16}$/

  const id1 = req.query.id1 as string
  const id2 = req.query.id2 as string
  
  if(id1.match(regex) && id2.match(regex)){
    req.session.restaurant_id = id1
    req.session.table_id = id2
    res.send("OKAY OKAY")
  } else {
    res.send('Invalid parameters')
  }
})

module.exports = router