import { createContext, useState, KeyboardEvent, MouseEvent } from "react";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

interface IToggleDrawerContext {
  isOpen: boolean;
  toggleDrawer: Function;
}

export const toggleDrawerContext = createContext<
  IToggleDrawerContext | undefined
>(undefined);

export default function ToggleDrawerProvider(props: any) {
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
    <toggleDrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      <Button onClick={toggleDrawer(true)}>{"right"}</Button>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: "100vw" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          PSL 
          {/* {url}
          {name}
          {price}
          {description} */}
        </Box>
      </Drawer>
      {props.children}
    </toggleDrawerContext.Provider>
  );
}
