import {
  useState,
  KeyboardEvent,
  MouseEvent,
  useContext,
  cloneElement,
} from "react";

import { toggleDrawerContext } from "../providers/ToggleDrawerProvider";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

export default function MenuItemPage(props: any) {
  const { name, price, url, description } = props.menuItem;

  const { isOpen, toggleDrawer } = useContext(toggleDrawerContext);

  return (
    <>
      <Button onClick={toggleDrawer(true)}>{"right"}</Button>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: "100vw" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {url}
          {name}
          {price}
          {description}
        </Box>
      </Drawer>
    </>
  );
}
