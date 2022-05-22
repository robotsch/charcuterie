import { useState, useEffect } from "react";

import ws from "../sockets/socket";

import Card from "@mui/material/Card";
import { List, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

interface Item {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  quantity: number;
  price: number;
}
interface ItemsByID {
  [key: string]: Item;
}

interface Order {
  [key: string]: ItemsByID;
}

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

  const renderedOrders = orders.map((order: Order, index) => {
    console.log("ORDER", order);
    console.log(orders.length);
    console.log("HERE");
    return (
      <Card key={index} sx={{ my: 2, p: 1 }}>
        {Object.entries(order).map(([name, items]) => {
          return (
            <div key={name}>
              <Typography variant="body1">{name}</Typography>
              <List>
                {Object.values(items).map((item: Item) => {
                  return (
                    <ListItem key={item._id}>
                      <Typography variant="body2">
                        {item.name} x {item.quantity}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>
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
          ws.emit("SUBMIT_ORDER", {
            restaurant: localStorage.getItem("restaurant"),
            currentOrder: {
              alex: {
                "6283f1d9804b848eb5e45602": {
                  _id: "6283f1d9804b848eb5e45602",
                  name: "kani sushi",
                  price: 25.99,
                  image_url:
                    "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
                  description: "6 pcs kani sushi",
                  quantity: 1,
                },
              },
            },
          });
          ws.emit("DB_TEST");
        }}
      >
        DB_TEST
      </Button>
      {renderedOrders}
    </Box>
  );
}
