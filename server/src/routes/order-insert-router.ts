import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  // const data = req.body
  const data = {
    Christian: {
      id: 1,
      name: 'Test food',
      quantity: 2,
    },
  };

  // const goal = {
  //   name: 'Christian',
  //   sub_orders: [
  //     { menu_item_id: ObjectId('6283f1d9804b848eb5e45600'), quantity: 100 },
  //   ],
  // };
});

module.exports = router;
