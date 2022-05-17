import { createContext, useState, KeyboardEvent, MouseEvent } from "react";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";


export const toggleDrawerContext = createContext<any>(undefined);

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
      {props.children}
    </toggleDrawerContext.Provider>
  );
}
