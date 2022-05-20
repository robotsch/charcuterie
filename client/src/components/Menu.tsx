import { useState, useContext } from "react";

import MenuItemList from "./MenuItemList";
import MenuItemPage from "./MenuItemPage";
import CurrentOrder from "./CurrentOrder";
import MenuFooter from "./MenuFooter";

import { salads, soups, order1 } from "../mockdata";

import ToggleDrawerProvider from "../providers/ToggleDrawerProvider";
import CurrentOrderDrawerProvider from "../providers/CurrentOrderDrawerProvider";

export default function Menu() {
  const [menuItem, setMenuItem] = useState({});

  const categories = [salads, soups];

  // const [currentOrder, setCurrentOrder] = useState({});

  return (
    <ToggleDrawerProvider>
      <CurrentOrderDrawerProvider>
        <MenuItemPage
          menuItem={menuItem}
          // currentOrder={currentOrder}
          // setCurrentOrder={setCurrentOrder}
        />
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
        <CurrentOrder />
        {/* <CurrentOrder
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        /> */}
      </CurrentOrderDrawerProvider>
    </ToggleDrawerProvider>
  );
}
