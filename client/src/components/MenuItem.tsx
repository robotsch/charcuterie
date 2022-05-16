import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { FoodItem } from "../../ts/foodItem_interface";

import "./MenuItem.scss";

export default function MenuItem(props: FoodItem) {
  const { name, price, url, description } = props;

  return (
    <Card sx={{ maxWidth: 900 }}>
      <CardContent sx={{ padding: 0 }}>
        <div className="menuItem">
          <div className="menuItem-img-container">
            <img src={url} alt="FOOD"></img>
          </div>
          <div>
            <h5 className="mont">{name}</h5>
            <Typography>{description}</Typography>
            <div>${(price / 100).toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
