import express, { Request, Response, Router,} from 'express';

const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {

  return Promise.all([
    // menuQueries.getAllMenuItems(),
    // menuQueries.getAllCategories(),
  ])
  .then((data) => {
    const mutatedData = ''

    res.send(
      JSON.stringify({mutatedData})
    )
  })
  .catch((err) => {
    res.status(500).send(`Failed to get menu items: ${err}`)
  })
})

module.exports = router