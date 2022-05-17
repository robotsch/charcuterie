import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import TablePastOrderItem from "./TablePastOrderItem";
import CurrentOrderItem from "./CurrentOrderItem";

import { FoodItem, Category, OrderList } from "../../ts/foodItem_interface";

export default function TablePastOrderList(props: OrderList) {
  const { group, table, orders } = props;

  console.log(orders);

  const orderSection = orders.map((order) => {
    return (
      <Accordion disableGutters key={order.id}>
        <AccordionSummary>
          <h3 className="mont">Order #{order.id}</h3>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 0,
          }}
        >
          fdsfdsf
        </AccordionDetails>
      </Accordion>
    );
  });

  return <>{orderSection}</>;
}
