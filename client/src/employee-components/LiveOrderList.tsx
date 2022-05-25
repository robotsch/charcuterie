import { useState, useEffect } from "react";

import ws from "../sockets/socket";
import axios from "axios";

import Card from "@mui/material/Card";
import { List, Paper, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
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

interface Big {
  order: Order;
  table: string;
}

export default function LiveOrderList(props: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const theme = useTheme();

  useEffect(() => {
    ws.emit("EMPLOYEE", { restaurant: localStorage.getItem("restaurant") });

    ws.on("SUBMIT_ORDER", (data) => {
      setOrders((prev) => {
        console.log(prev);
        console.log(data);
        console.log("table: ", data.table);
        console.log("order: ", data.order);
        return [...prev, { table: data.table, order: data.order }];
      });
      console.log("after setOrders: ", orders);
    });

    return () => {
      ws.off("SUBMIT_ORDER");
    };
  }, []);

  const renderedOrders = orders.map((order: Big, index) => {
    return (
      <Card key={index} sx={{ my: 2, p: 1 }}>
        <Box>
          <span className="mont">Table #{order.table}</span>
        </Box>
        <Divider />
        {Object.entries(order.order).map(([name, items]) => {
          return (
            <>
              <Typography variant="body1">{name}</Typography>
              <List>
                {Object.values(items).map((item: Item) => {
                  return (
                    <ListItem key={item._id}>
                      <Typography variant="body2">
                        {item.quantity} x {item.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </>
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
