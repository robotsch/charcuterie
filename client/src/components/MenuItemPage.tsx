import { useContext, useEffect, useState } from "react";

import { toggleDrawerContext } from "../providers/ToggleDrawerProvider";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";

import ws from "../sockets/socket";

import { useTheme } from "@mui/material/styles";

import "./MenuItemPage.scss";

export default function MenuItemPage(props: any) {
  const theme = useTheme();

  const { _id, name, price, image_url, description } = props.menuItem;

  const { isOpen, toggleDrawer } = useContext(toggleDrawerContext);

  const [quantity, setQuantity] = useState<number>(0);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");

  const [alertStatus, setAlertStatus] = useState<string>("");

  useEffect(() => {
    setQuantity(0);
    setQuantityError(false);
    setHelperText("");
    setAlertStatus("");
  }, [props.menuItem]);

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: "100vw" }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <Button
          size="small"
          variant="contained"
          sx={{ position: "absolute", top: 10, left: 10 }}
          onClick={toggleDrawer(false)}
        >
          Back
        </Button>
        <div className="menuItemPage-img-container">
          <img src={image_url} alt="FOOD"></img>
        </div>

        <Box sx={{ p: 3, display: "flex", gap: 2, flexDirection: "column" }}>
          <h3 className="mont">{name}</h3>
          {description}
        </Box>

        <Box sx={{ p: 2 }}>
          <form
            id="menuItemPage-quantity"
            onSubmit={(event: any) => {
              event.preventDefault();

              if (!event.target[0].value) {
                setHelperText("Required");
                setQuantityError(true);
                setAlertStatus("");
                return;
              }

              const quantity = parseInt(event.target[0].value);
              if (quantity === 0 || quantity < 0) {
                setHelperText("Quantity must be greater than 0");
                setQuantityError(true);
                setAlertStatus("");
                return;
              }

              if (quantity >= 50) {
                setHelperText("Quantity cannot be over 50");
                setQuantityError(true);
                setAlertStatus("");
                return;
              }

              ws.emit("UPDATE_ORDER", {
                name: localStorage.getItem("user"),
                order: {
                  ...props.menuItem,
                  quantity,
                },
                restaurant: localStorage.getItem("restaurant"),
                table: localStorage.getItem("table"),
              });

              setAlertStatus(`${quantity} x ${name} added to order!`);
              toggleDrawer(false)(event);
            }}
          >
            <TextField
              required
              error={quantityError}
              type="number"
              name="quantity"
              label="Quantity"
              placeholder="1"
              onChange={(event: any) => {
                const quantity = parseInt(event.target.value);
                if (quantity === 0 || quantity < 0) {
                  setHelperText("Quantity must be greater than 0");
                  setQuantityError(true);
                  return;
                }

                if (quantity >= 50) {
                  setHelperText("Quantity cannot be over 50");
                  setQuantityError(true);
                  return;
                }

                setQuantity(quantity);
                setHelperText("");
                setQuantityError(false);
              }}
              sx={
                theme.palette.mode === "dark"
                  ? { color: "#fff", width: 180 }
                  : { color: "#000", width: 180 }
              }
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>Add to Order</div>
              <div>${((price || 0) * (quantity || 1)).toFixed(2)}</div>
            </Button>
          </form>
          <FormHelperText>{helperText}</FormHelperText>
          {alertStatus !== "" && (
            <Alert sx={{ my: 3 }} severity="success">
              {alertStatus}
            </Alert>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
