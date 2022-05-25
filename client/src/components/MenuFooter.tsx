import { useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { currentOrderDrawerContext } from "../providers/CurrentOrderDrawerProvider";

export default function MenuFooter() {
  const { toggleCurrentOrderDrawer } = useContext(currentOrderDrawerContext);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        p: 2,
      }}
    >
      <Button
        sx={{ width: "80%" }}
        variant="contained"
        onClick={toggleCurrentOrderDrawer(true)}
      >
        View Current Order
      </Button>
    </Box>
  );
}
