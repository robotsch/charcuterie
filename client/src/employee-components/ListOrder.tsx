import { Order } from "../../ts/foodItem_interface";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function LiveOrder(props: any) {
  return (
    <Card>
      <CardContent sx={{ padding: 0 }}>
        <List>
          {Object.values(props).map((foodItem: any) => {
            return (
              <ListItem key={foodItem.id}>
              <Typography variant="body2">{foodItem.name} x {foodItem.quantity}</Typography>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
