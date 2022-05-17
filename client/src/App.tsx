import { useState } from "react";
import "./App.scss";

import {
  Category,
  FoodItem,
  Order,
  OrderFoodItem,
} from "../ts/foodItem_interface";

import MenuItemList from "./components/MenuItemList";
import TemporaryDrawer from "./components/Drawer";
import CurrentOrder from "./components/CurrentOrder";

import { salads, soups, order1 } from "./mockdata";

export default function App() {
  const categories = [salads, soups];

  const categoryMenu = categories.map((category) => {
    return (
      <MenuItemList
        key={category.id}
        id={category.id}
        name={category.name}
        menuItems={category.menuItems}
      ></MenuItemList>
    );
  });

  return (
    <div className="App">
      <TemporaryDrawer />
      {categoryMenu}
      <CurrentOrder
        id={order1.id}
        group={order1.group}
        table={order1.table}
        timePlaced={order1.timePlaced}
        orderFoodItems={order1.orderFoodItems}
      />
    </div>
  );
}
