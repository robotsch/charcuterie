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
            console.log(foodItem);
            return (
              <ListItem key={foodItem._id}>
                <Typography variant="body2" key={foodItem._id}>
                  {foodItem.name} x {foodItem.quantity}
                </Typography>
              </ListItem>
            );
          })}
        </List>
        {/* <List>
          <ListItem>
            <Typography variant="body2">
              {name} x {quantity}
            </Typography>
          </ListItem>
        </List> */}
      </CardContent>
    </Card>
  );
}

/////////////////////////////////////
// UNUSED