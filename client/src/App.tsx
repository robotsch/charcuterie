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

import { salads, soups, order } from "./mockdata";

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
        id={order.id}
        group={order.group}
        table={order.table}
        timePlaced={order.timePlaced}
        orderFoodItems={order.orderFoodItems}
      />
    </div>
  );
}
