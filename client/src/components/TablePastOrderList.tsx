import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import CurrentOrderItem from "./CurrentOrderItem";
import TablePastOrderItem from "./TablePastOrderItem";

import { FoodItem, Category, OrderList } from "../../ts/foodItem_interface";

export default function TablePastOrderList(props: OrderList) {
  const { orders } = props;

  const orderSection = orders.map((order) => {
    const orderedFoodItems = order.orderFoodItems.map((foodItem) => {
      return (
        <CurrentOrderItem
          key={foodItem.id}
          {...foodItem}
        />
      );
    });

    return (
      <Accordion disableGutters key={order.id}>
        <AccordionSummary>
          <h3 className="mont">Order #{order.id}</h3>
          Ordered at: {order.timePlaced}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 0,
          }}
        >
          {orderedFoodItems}
        </AccordionDetails>
      </Accordion>
    );
  });

  return <>{orderSection}</>;
}
