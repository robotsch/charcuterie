import { Order } from "../../ts/foodItem_interface";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function LiveOrder(props: any) {
  return (
    <List>
      {Object.values(props).map((foodItem: any) => {
        return (
          <ListItem key={foodItem.id}>
            <Typography variant="body1"></Typography>
            <Typography variant="body2">
              {foodItem.name} x {foodItem.quantity}
            </Typography>
          </ListItem>
        );
      })}
      <Button variant="outlined" color="success">
        Accept
      </Button>
      <Button variant="outlined" color="error">
        Reject
      </Button>
    </List>
  );
}
