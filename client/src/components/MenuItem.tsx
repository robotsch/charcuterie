import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Item } from "../../ts/menuItem_interface";

export default function MenuItem(props: Item) {
  const { name, price, url, description } = props;

  return (
    <section className="menu-item">
      <Card sx={{ maxWidth: 900 }}>
        <CardContent>
          <img src={url} alt="FOOD"></img>
          <h1>{name}</h1>
          <p>
            {description}
          </p>
          <div>${(price / 100).toFixed(2)}</div>
        </CardContent>
      </Card>
    </section>
  );
}
