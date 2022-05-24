import { List, ListItem } from "@mui/material";

export default function Items(props: any) {
  const { bill } = props;

  return (
    <List>
      {Object.entries(bill).map(([id, item]) => {
        return (
          <ListItem key={id}>
            {item.name} x {item.quantity} = $
            {(item.totalPrice / 100).toFixed(2)}
          </ListItem>
        );
      })}
    </List>
  );
}
