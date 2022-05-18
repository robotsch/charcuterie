import { useContext } from "react";

import { toggleDrawerContext } from "../providers/ToggleDrawerProvider";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function MenuItemPage(props: any) {
  const { name, price, url, description } = props.menuItem;

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
            <img src={url} alt="FOOD"></img>
          </div>
          <h3 className="mont">{name}</h3>
          {description}
          <Box sx={{ backgroundColor: "#1B2432" }}>
            <Button variant="contained">${(price / 100).toFixed(2)}</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
