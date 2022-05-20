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

import ws from "../sockets/socket";

interface Order {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  url: string;
}
interface CurrentOrderProps {
  currentOrder: {
    [key: string]: Order;
  };
  setCurrentOrder: Function;
}

interface CurrentOrder {
  [key: string]: Order;
}

import { currentOrderDrawerContext } from "../providers/CurrentOrderDrawerProvider";

// export default function CurrentOrder(props: CurrentOrderProps) {
export default function CurrentOrder() {
  // const { currentOrder, setCurrentOrder } = props;

  // console.log(currentOrder);

  // const [currentOrder, setCurrentOrder] = useState<CurrentOrder>({});
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder>(
    JSON.parse(localStorage.getItem("currentOrder")) || {}
  );

  const { isOpenCurrentOrder, toggleCurrentOrderDrawer } = useContext(
    currentOrderDrawerContext
  );

  useEffect(() => {
    console.log("currentOrder", currentOrder);
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
  }, [currentOrder]);

  useEffect(() => {
    ws.on("connect", () => {
      ws.emit("RECONNECT", {
        name: localStorage.getItem("user"),
        restaurant: localStorage.getItem("restaurant"),
        table: localStorage.getItem("table"),
      });
    });

    ws.on("UPDATE_ORDER", ({ name, order }) => {
      console.log("in CurrentOrder useEffect []", { name, order });
      setCurrentOrder((prev: any) => {
        if (prev[name] !== undefined && prev[name][order.id] !== undefined) {
          const updatedOrder = prev[name][order.id];
          updatedOrder.quantity += order.quantity;
          return {
            ...prev,
            [name]: { ...prev[name], [order.id]: updatedOrder },
          };
        }
        return { ...prev, [name]: { ...prev[name], [order.id]: order } };
      });
    });

    return () => {
      ws.off("UPDATE_ORDER");
    };
  }, []);

  const getItemsForName = (name: string) => {
    return (
      <List key={name}>
        <>
          <Typography>{name}</Typography>
          {Object.values(currentOrder[name]).map((item) => {
            // console.log(item);
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
            {Object.keys(currentOrder).length === 0 ? (
              <Typography variant="body1">
                No items added to the list
              </Typography>
            ) : (
              Object.keys(currentOrder).map((name) => {
                return getItemsForName(name);
              })
            )}
          </Container>
        </Box>
      </Drawer>
    </>
  );
}
