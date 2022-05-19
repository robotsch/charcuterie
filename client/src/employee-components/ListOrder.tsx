import { Order } from "../../ts/foodItem_interface";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function LiveOrder(props: Order) {
  const { id, group, table, timePlaced, orderFoodItems } = props;

  return (
    <Card>
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h5">Order #{id}</Typography>
        <Typography variant="body1">Group: {group}</Typography>
        <Typography variant="body1">Table: {table}</Typography>
        <Typography variant="body1">TimePlaced: {timePlaced}</Typography>
        <List>
          {orderFoodItems.map((foodItem) => {
            return (
              <ListItem key={foodItem.id}>
                {foodItem.name} x {foodItem.quantity}
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
