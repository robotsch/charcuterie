import { useState, useEffect } from "react";

import LiveOrder from "./ListOrder";
import SideBar from "./SideBar";

import ws from "../sockets/socket";

import { orderList } from "../mockdata";

import Card from "@mui/material/Card";
import { List, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function LiveOrderList() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    ws.emit("EMPLOYEE", { restaurant: "6283f1d9804b848eb5e4560c" });

    ws.on("SUBMIT_ORDER", (order) => {
      console.log("SUBMIT_ORDER", order);
      setOrders((prev) => [...prev, order]);
      console.log("orders", orders);
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
      <Card sx={{ margin: 3, padding: 1 }}>
        {Object.keys(order).map((name) => {
          return (
            <>
              <Typography variant="body1">{name}</Typography>
              <LiveOrder key={name} {...order[name]} />
            </>
          );
        })}
      </Card>
    );
  });

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Typography variant="h4">Live Order Feed</Typography>
      <Button
        variant="contained"
        onClick={() => {
          // ws.emit("SUBMIT_ORDER");
          ws.emit("DB_TEST");
        }}
      >
        DB_TEST
      </Button>
      {renderedOrders}
    </Box>
  );
}
