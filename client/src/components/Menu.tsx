import { useState, useContext } from "react";

import MenuItemList from "./MenuItemList";
import MenuItemPage from "./MenuItemPage";
import CurrentOrder from "./CurrentOrder";
import MenuFooter from "./MenuFooter";

import { salads, soups, order1 } from "../mockdata";

import Button from "@mui/material/Button";

import ToggleDrawerProvider from "../providers/ToggleDrawerProvider";
import CurrentOrderDrawerProvider from "../providers/CurrentOrderDrawerProvider";

export default function Menu() {
  const [menuItem, setMenuItem] = useState({});

  const categories = [salads, soups];

  return (
    <ToggleDrawerProvider>
      <CurrentOrderDrawerProvider>
        <MenuItemPage menuItem={menuItem} />
        {categories.map((category) => {
          return (
            <MenuItemList
              setMenuItem={setMenuItem}
              key={category.id}
              {...category}
            ></MenuItemList>
          );
        })}
        <MenuFooter />
        <CurrentOrder
          id={order1.id}
          group={order1.group}
          table={order1.table}
          timePlaced={order1.timePlaced}
          orderFoodItems={order1.orderFoodItems}
        />
      </CurrentOrderDrawerProvider>
    </ToggleDrawerProvider>
  );
}
