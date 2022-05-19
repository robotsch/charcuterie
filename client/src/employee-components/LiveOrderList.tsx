import LiveOrder from "./ListOrder";

import { Typography } from "@mui/material";

import { orderList } from "../mockdata";

export default function LiveOrderList() {
  return (
    <>
      <Typography variant="h4">Live Order Feed</Typography>
      {orderList.orders.map((order) => {
        return <LiveOrder key={order.id} {...order} />;
      })}
    </>
  );
}
