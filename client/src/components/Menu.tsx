import { useState, useContext, useEffect } from "react";

import MenuItemList from "./MenuItemList";
import MenuItemPage from "./MenuItemPage";
import CurrentOrder from "./CurrentOrder";
import MenuFooter from "./MenuFooter";

import axios from "axios";

import { useTheme } from "@mui/material/styles";

import { ColorModeContext } from "../providers/ColorModeProvider";

import ToggleDrawerProvider from "../providers/ToggleDrawerProvider";
import CurrentOrderDrawerProvider from "../providers/CurrentOrderDrawerProvider";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

interface MenuItem {
  id: string;
  category: string;
  description: string;
  image_url: string;
  price: number;
}

interface Menu {
  [key: string]: Array<MenuItem>;
}

export default function Menu() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [menuItem, setMenuItem] = useState({});

  const [menu, setMenu] = useState({});
  const [alertStatus, setAlertStatus] = useState<string>("");

  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    axios
      // .get(
      //   `http://localhost:3001/api/menu?id=${localStorage.getItem(
      //     "restaurant"
      //   )}`
      // )
      .get(`/api/menu?id=${localStorage.getItem("restaurant")}`)
      .then((res) => {
        const setCategories: Set<string> = new Set(
          res.data.map((item: MenuItem) => item.category)
        );

        const categories: Array<string> = [...setCategories];

        const parsedMenu: Menu = {};
        categories.forEach((category: string) => {
          parsedMenu[category] = [];
        });

        res.data.forEach((item: MenuItem) => {
          parsedMenu[item.category].push(item);
        });

        setMenu(parsedMenu);
        // setAlertStatus("");
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  useEffect(() => {
    console.log("[alertStatus]", alertStatus, showAlert);

    if (alertStatus !== "") {
      setTimeout(() => {
        console.log("fade in");
        setShowAlert(true);
      }, 400);

      setTimeout(() => {
        console.log("fade out");
        setShowAlert(false);
        setTimeout(() => {
          setAlertStatus("");
        }, 100)
      }, 3000);
    }
  }, [alertStatus]);

  return (
    <ToggleDrawerProvider>
      <CurrentOrderDrawerProvider>
        <MenuItemPage
          menuItem={menuItem}
          setAlertStatus={setAlertStatus}
          alertStatus={alertStatus}
        />
        {Object.entries(menu).map(([category, menuItems]) => {
          return (
            <MenuItemList
              key={category}
              setMenuItem={setMenuItem}
              name={category}
              menuItems={menuItems}
            />
          );
        })}
        {alertStatus !== "" && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              bottom: 60,
              p: 2,
            }}
          >
            <Fade in={showAlert}>
              <Alert severity="success">{alertStatus}</Alert>
            </Fade>
          </Box>
        )}
        <MenuFooter />
        <CurrentOrder />
      </CurrentOrderDrawerProvider>
    </ToggleDrawerProvider>
  );
}
