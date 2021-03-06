import { useContext } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { FoodItem } from "../../ts/foodItem_interface";

import { toggleDrawerContext } from "../providers/ToggleDrawerProvider";

import "./MenuItem.scss";

export default function MenuItem(props: any) {
  const { _id, name, price, image_url, description, setMenuItem } = props;

  const { toggleDrawer } = useContext(toggleDrawerContext);

  const parsedDescription =
    description.length >= 110
      ? description.substring(0, 110) + "..."
      : description;

  return (
    <Card sx={{ maxWidth: 900, height: 120 }}>
      <CardActionArea onClick={toggleDrawer(true)}>
        <CardContent
          sx={{ padding: 0 }}
          onClick={() =>
            setMenuItem({
              _id,
              name,
              price,
              image_url,
              description: description,
            })
          }
        >
          <Box className="menuItem">
            <div className="menuItem-img-container">
              <img src={image_url} alt="FOOD"></img>
            </div>
            <div>
              <h5 className="mont">{name}</h5>
              <Typography variant="body2">{parsedDescription}</Typography>
              <div>${(price / 100).toFixed(2)}</div>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
