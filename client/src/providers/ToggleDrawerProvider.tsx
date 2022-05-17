import { createContext, useState, KeyboardEvent, MouseEvent } from "react";

export const toggleDrawerContext = createContext(false);

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
}
