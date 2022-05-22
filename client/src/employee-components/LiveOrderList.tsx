import { useState, useEffect } from "react";
import LiveOrder from "./ListOrder";
import { List, Typography } from "@mui/material";
import { orderList } from "../mockdata";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ws from "../sockets/socket";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function LiveOrderList() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    ws.emit("EMPLOYEE", { restaurant: "6283f1d9804b848eb5e4560c" });

    ws.on("SUBMIT_ORDER", (order) => {
      // console.log(order);
      setOrders((prev) => [...prev, order]);
    });

    ws.on("DB_TEST", (res) => {
      console.log("result: ", res);
    });

    return () => {
      ws.off("SUBMIT_ORDER");
      ws.off("DB_TEST");
    };
  }, []);

  const renderedOrders = orders.map((order) => {
    return (
      <>
        {Object.keys(order).map((name) => {
          return (
            <>
              <Typography variant="body1">{name}</Typography>
              <LiveOrder key={name} {...order[name]} />
            </>
          );
        })}
      </>
    );
  });

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography paragraph>
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
          </Typography>
        </Box>
      </Box>
    </>
  );
}
