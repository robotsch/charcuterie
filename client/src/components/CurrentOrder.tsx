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
import { ProductionQuantityLimits } from "@mui/icons-material";

// export default function CurrentOrder(props: CurrentOrderProps) {
export default function CurrentOrder() {
  // const { currentOrder, setCurrentOrder } = props;

  // console.log(currentOrder);

  // const [currentOrder, setCurrentOrder] = useState<CurrentOrder>({});
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
      console.log("SUBMIT_ORDER listener");
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

    return () => {
      ws.off("UPDATE_ORDER");
      ws.off("SUBMIT_ORDER");
    };
  }, []);

  const getItemsForName = (name: string) => {
    return (
      <List key={name}>
        <>
          <Typography>{name}</Typography>
          {Object.values(currentOrder[name]).map((item) => {
            return (
              <ListItem key={item.id}>
                {item.quantity} x {item.name}
              </ListItem>
            );
          })}
        </>
      </List>
    );
  };

  return (
    <>
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
          <Container sx={{ backgroundColor: "orange" }} disableGutters>
            <h1 className="mont">CURRENT ORDER</h1>
            <Divider />
            {orderState === "NO_ITEMS" && (
              <Typography variant="body1">
                No items added to the list
              </Typography>
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
                      // console.log(item);
                      return { id: item._id, quantity: item.quantity };
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
                    .then((res) => {
                      console.log('HERE');
                      ws.emit("SUBMIT_ORDER", {
                        restaurant: localStorage.getItem("restaurant"),
                        currentOrder,
                      });
                      console.log(res);
                      console.log(res.data);
                    })
                    .catch((error) => console.log(error));
                }}
              >
                {Object.keys(currentOrder).map((name) => {
                  return getItemsForName(name);
                })}
                <Button type="submit" variant="contained">
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
    </>
  );
}
