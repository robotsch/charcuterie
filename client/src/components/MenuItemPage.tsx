import { useContext, useEffect } from "react";

import { toggleDrawerContext } from "../providers/ToggleDrawerProvider";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import ws from "../sockets/socket";

import "./MenuItemPage.scss";

export default function MenuItemPage(props: any) {
  const { _id, name, price, image_url, description } = props.menuItem;

  // console.log(props);

  const { isOpen, toggleDrawer } = useContext(toggleDrawerContext);

  return (
    <>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: "100vw" }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Button
            size="small"
            variant="contained"
            sx={{ position: "absolute" }}
            onClick={toggleDrawer(false)}
          >
            <ArrowBackIosNewIcon />
          </Button>
          <div className="menuItemPage-img-container">
            <img src={image_url} alt="FOOD"></img>
          </div>
          <h3 className="mont">{name}</h3>
          {description}
          <Box sx={{ backgroundColor: "#1B2432" }}>
            <Button variant="contained">${(price / 100).toFixed(2)}</Button>
          </Box>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              ws.emit("UPDATE_ORDER", {
                name: localStorage.getItem("user"),
                order: {
                  ...props.menuItem,
                  quantity: parseInt(event.target[0].value),
                },
                restaurant: localStorage.getItem("restaurant"),
                table: localStorage.getItem("table"),
              });
            }}
          >
            <TextField
              type="number"
              name="quantity"
              label="Quantity"
              placeholder="1"
            ></TextField>
            <Button type="submit" variant="contained">
              Add to Current Order
            </Button>
          </form>
        </Box>
      </Drawer>
    </>
  );
}
