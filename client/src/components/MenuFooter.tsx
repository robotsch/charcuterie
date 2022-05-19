import { useContext } from "react";
import Button from "@mui/material/Button";

import { currentOrderDrawerContext } from "../providers/CurrentOrderDrawerProvider";

export default function MenuFooter() {
  const { toggleCurrentOrderDrawer } = useContext(currentOrderDrawerContext);
  return (
    <Button onClick={toggleCurrentOrderDrawer(true)}>View Current Order</Button>
  );
}
