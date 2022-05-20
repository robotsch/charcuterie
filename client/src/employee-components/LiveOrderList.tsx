import { useState, useEffect } from "react";
import LiveOrder from "./ListOrder";
import { Typography } from "@mui/material";
import { orderList } from "../mockdata";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ws from "../sockets/socket";

export default function LiveOrderList() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    ws.emit("EMPLOYEE", "restaurant");

    

    ws.on("SUBMIT_ORDER", (order) => {
      updateOrders(order);
    });
    ws.on("DB_TEST", (res) => {
      console.log("result: ", res)
    });

    console.log(orders);
    return () => {
      ws.off("SUBMIT_ORDER");
      ws.off("DB_TEST");
    };
  }, []);

  const updateOrders = (order: {}) => {
    setOrders((prev) => [...prev, order]);
  };

  const renderedOrders = orders.map((order) => {
    return (
      <LiveOrder
        key={order.id}
        id={order.id}
        group={order.group}
        table={order.table}
        timePlaced={order.timePlaced}
        orderFoodItems={order.orderFoodItems}
      />
    );
  });

  return (
    <>
      <button
        onClick={() => {
          ws.emit("SUBMIT_ORDER");
          ws.emit("DB_TEST");
        }}
      >
        Test
      </button>
      <Typography variant="h4">Live Order Feed</Typography>
      {renderedOrders}
    </>
  );
}

// .../employee?restaurantID=1