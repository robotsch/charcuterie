import { useContext } from "react";

import { Order } from "../../ts/foodItem_interface";

import CurrentOrderItem from "./CurrentOrderItem";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";

import { currentOrderDrawerContext } from "../providers/CurrentOrderDrawerProvider";

export default function CurrentOrder(props: any) {
  const { group, table, timePlaced, orderFoodItems } = props;

  const foodItems = orderFoodItems.map((foodItem: any) => {
    return <CurrentOrderItem key={foodItem.id} {...foodItem} />;
  });

  const { isOpenCurrentOrder, toggleCurrentOrderDrawer } = useContext(
    currentOrderDrawerContext
  );

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
            {foodItems}
          </Container>
        </Box>
      </Drawer>
    </>
  );
}
