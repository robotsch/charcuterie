import { useState, useContext, useEffect } from "react";

import MenuItemList from "./MenuItemList";
import MenuItemPage from "./MenuItemPage";
import CurrentOrder from "./CurrentOrder";
import MenuFooter from "./MenuFooter";

import axios from "axios";

import ToggleDrawerProvider from "../providers/ToggleDrawerProvider";
import CurrentOrderDrawerProvider from "../providers/CurrentOrderDrawerProvider";

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
  const [menuItem, setMenuItem] = useState({});

  const [menu, setMenu] = useState({});

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
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return (
    <ToggleDrawerProvider>
      <CurrentOrderDrawerProvider>
        <MenuItemPage menuItem={menuItem} />
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
        <MenuFooter />
        <CurrentOrder />
      </CurrentOrderDrawerProvider>
    </ToggleDrawerProvider>
  );
}
