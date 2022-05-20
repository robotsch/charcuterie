import { createContext, useState, KeyboardEvent, MouseEvent } from "react";

export const currentOrderDrawerContext = createContext<any>(false);

export default function CurrentOrderDrawerProvider(props: any) {
  const [isOpenCurrentOrder, setIsOpenCurrentOrder] = useState(false);

  const toggleCurrentOrderDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpenCurrentOrder(open);
    };

  return (
    <currentOrderDrawerContext.Provider
      value={{ isOpenCurrentOrder, toggleCurrentOrderDrawer }}
    >
      {props.children}
    </currentOrderDrawerContext.Provider>
  );
}
