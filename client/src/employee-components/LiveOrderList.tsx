import { useEffect } from "react";
import LiveOrder from "./ListOrder";
import { Typography } from "@mui/material";
import { orderList } from "../mockdata";
import ws from "../sockets/socket"

export default function LiveOrderList() {
  useEffect(() => {
    ws.emit('EMPLOYEE', 'restaurant')
    
    ws.on('SUBMIT_ORDER', (order) => {
      console.log(order)
    })

    return () => {
      ws.off('test')
    }
  }, [])
  
  return (
    <>
      <Typography variant="h4">Live Order Feed</Typography>
      {orderList.orders.map((order) => {
        return <LiveOrder key={order.id} {...order} />;
      })}
    </>
  );
}
