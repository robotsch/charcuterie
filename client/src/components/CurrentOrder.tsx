import { useState, useContext, useEffect } from "react";

// import { Order } from "../../ts/foodItem_interface";

import CurrentOrderItem from "./CurrentOrderItem";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


import ws from "../sockets/socket";

interface Order {
  _id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  url: string;
}

interface CurrentOrder {
  [key: string]: Order;
}

type OrderState = "NO_ITEMS" | "ITEMS" | "SUBMITTED";

import { currentOrderDrawerContext } from "../providers/CurrentOrderDrawerProvider";
import axios from "axios";

export default function CurrentOrder() {
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder>(
    JSON.parse(localStorage.getItem("currentOrder") || "{}")
  );

  const [orderState, setOrderState] = useState<OrderState>("ITEMS");

  const { isOpenCurrentOrder, toggleCurrentOrderDrawer } = useContext(
    currentOrderDrawerContext
  );

  useEffect(() => {
    // console.log("orderState in useEffect [currentOrder]", orderState);
    console.log("currentOrder", currentOrder);
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));

    if (Object.keys(currentOrder).length === 0) {
      setOrderState("NO_ITEMS");
    } else {
      setOrderState("ITEMS");
    }
  }, [currentOrder]);

  useEffect(() => {
    ws.on("connect", () => {
      ws.emit("RECONNECT", {
        name: localStorage.getItem("user"),
        restaurant: localStorage.getItem("restaurant"),
        table: localStorage.getItem("table"),
        // emit users and order in case that someone joins a table after
        // items have already been added to current order by other users at table
      });
    });

    ws.on("SUBMIT_ORDER", () => {
      setOrderState("SUBMITTED");
      setCurrentOrder({});
    });

    ws.on("UPDATE_ORDER", ({ name, order }) => {
      console.log("in CurrentOrder useEffect []", { name, order });
      setCurrentOrder((prev: any) => {
        if (prev[name] !== undefined && prev[name][order._id] !== undefined) {
          const updatedOrder = prev[name][order._id];
          updatedOrder.quantity += order.quantity;
          return {
            ...prev,
            [name]: { ...prev[name], [order._id]: updatedOrder },
          };
        }
        return { ...prev, [name]: { ...prev[name], [order._id]: order } };
      });
    });

    ws.on("REMOVE_ITEM", ({ name, menuItemID }) => {
      console.log(name, menuItemID);
      setCurrentOrder((prev: any) => {
        const newState = { ...prev };
        delete newState[name][menuItemID];
        if (Object.values(newState[name]).length === 0) {
          delete newState[name];
        }
        return newState;
      });
    });

    return () => {
      ws.off("UPDATE_ORDER");
      ws.off("SUBMIT_ORDER");
      ws.off("REMOVE_ITEM");
    };
  }, []);

  const getItemsForName = (name: string) => {
    const user = localStorage.getItem("user");
    return (
      <List key={name}>
        <Typography>{name}</Typography>
        {Object.values(currentOrder[name]).map((item) => {
          return (
            <Box sx={{ display: "flex" }}>
              <ListItem key={item._id}>
                {item.quantity} x {item.name}
              </ListItem>
              {user === name && (
                <IconButton
                  color="error"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    console.log(currentOrder);
                    ws.emit("REMOVE_ITEM", {
                      name: localStorage.getItem("user"),
                      menuItemID: item._id,
                      restaurant: localStorage.getItem("restaurant"),
                      table: localStorage.getItem("table"),
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          );
        })}
      </List>
    );
  };

  return (
    <Drawer
      anchor={"bottom"}
      open={isOpenCurrentOrder}
      onClose={toggleCurrentOrderDrawer(false)}
    >
      <Box
        sx={{ width: "100vw" }}
        role="presentation"
        onKeyDown={toggleCurrentOrderDrawer(false)}
      >
        <Container sx={{ pb: 2, pt: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <span className="mont header">CURRENT ORDER</span>
          </Box>
          <Divider />

          {orderState === "NO_ITEMS" && (
            <List>
              <ListItem>
                <Typography variant="body1">
                  No items added to the list
                </Typography>
              </ListItem>
            </List>
          )}

          {orderState === "ITEMS" && (
            <form
              onSubmit={(event: any) => {
                event.preventDefault();
                console.log("submit order", currentOrder);

                const parsedCurrentOrder: { [key: string]: any } = {};
                for (const name in currentOrder) {
                  parsedCurrentOrder[name] = Object.values(
                    currentOrder[name]
                  ).map((item) => {
                    return {
                      id: item._id,
                      quantity: item.quantity,
                      name: item.name,
                      totalPrice: item.price * item.quantity,
                      restaurant_id: localStorage.getItem("restaurant"),
                    };
                  });
                }

                const send = {
                  restaurant: localStorage.getItem("restaurant"),
                  table: localStorage.getItem("table"),
                  order: parsedCurrentOrder,
                };

                console.log("send", send);

                axios
                  .post("http://localhost:3001/api/order", send)
                  // .post(`/api/order`, send)
                  .then((res) => {
                    console.log("data: ", res.data);
                    console.log("RES: ", res);
                    ws.emit("SUBMIT_ORDER", {
                      order_id: res.data,
                      restaurant: localStorage.getItem("restaurant"),
                      currentOrder,
                      tableName: localStorage.getItem("tableName"),
                    });
                  })
                  .catch((error) => console.log(error));
              }}
            >
              {Object.keys(currentOrder).map((name) => {
                return getItemsForName(name);
              })}
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", textAlign: "center" }}
              >
                Submit Order
              </Button>
            </form>
          )}

          {orderState === "SUBMITTED" && (
            <Typography variant="body1">
              Your order has been submitted!
            </Typography>
          )}
        </Container>
      </Box>
    </Drawer>
  );
}
