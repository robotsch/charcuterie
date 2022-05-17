import { Divider, Container } from "@mui/material";

import { Order } from "../../ts/foodItem_interface";

import CurrentOrderItem from "./CurrentOrderItem";

export default function CurrentOrder(props: Order) {
  const { group, table, timePlaced, orderFoodItems } = props;

  const foodItems = orderFoodItems.map((foodItem) => {
    return <CurrentOrderItem key={foodItem.id} {...foodItem} />;
  });

  return (
    <Container sx={{ backgroundColor: "orange" }} disableGutters>
      <h1 className="mont">CURRENT ORDER</h1>
      <Divider />
      {foodItems}
    </Container>
  );
}
