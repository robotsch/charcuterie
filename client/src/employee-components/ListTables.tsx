//import { Table } from "../../ts/foodItem_interface";

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
          {Object.values(props).map((table: any) => {
            return (
              <ListItem key={table.id}>
                <Typography variant="body2">{table.id}</Typography>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
