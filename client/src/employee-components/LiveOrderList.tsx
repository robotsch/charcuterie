import { useState, useEffect } from "react";

import ws from "../sockets/socket";
import axios from "axios";

import Card from "@mui/material/Card";
import { List, Paper, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";

import { useTheme } from "@mui/material/styles";

const drawerWidth = 400;

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

export default function LiveOrderList(props: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const theme = useTheme();

  useEffect(() => {
    ws.emit("EMPLOYEE", { restaurant: localStorage.getItem("restaurant") });

    ws.on("SUBMIT_ORDER", (order) => {
      console.log("SUBMIT_ORDER", order);
      setOrders((prev) => [...prev, order]);
      console.log("orders", orders);
    });

    return () => {
      ws.off("SUBMIT_ORDER");
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
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "primary.main",
          },
          height: "100%",
        }}
        variant="permanent"
        anchor="right"
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <CircleIcon fontSize="small" sx={{ mr: 2 }} />
          <span className="mont" id="live-feed-header">
            Live Order Feed
          </span>
        </Box>
        <Divider sx={{ width: "90%", mx: "auto" }} />
        {renderedOrders}
      </Drawer>
    </Box>
  );
}
