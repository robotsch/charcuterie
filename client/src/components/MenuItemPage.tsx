import { useState, KeyboardEvent, MouseEvent } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

export default function MenuItemPage(props: any) {
  const { name, price, url, description } = props.menuItem;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

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
