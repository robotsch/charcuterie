import { CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

import { FoodItem } from "../../ts/foodItem_interface";

import "./MenuItem.scss";

export default function MenuItem(props: any) {
  const { id, name, price, url, description, setMenuItem } = props;

  return (
    <Card sx={{ maxWidth: 900, height: 120 }}>
      <CardActionArea
        onClick={() => setMenuItem({ id, name, price, url, description })}
      >
        <CardContent sx={{ padding: 0 }}>
          <div className="menuItem">
            <div className="menuItem-img-container">
              <img src={url} alt="FOOD"></img>
            </div>
            <div>
              <h5 className="mont">{name}</h5>
              <Typography variant="body2">{description}</Typography>
              <div>${(price / 100).toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
