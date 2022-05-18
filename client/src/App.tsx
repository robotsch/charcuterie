import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

import {
  Category,
  FoodItem,
  Order,
  OrderFoodItem,
} from "../ts/foodItem_interface";

import MenuItemList from "./components/MenuItemList";
import CurrentOrder from "./components/CurrentOrder";
import Menu from "./components/Menu";
import TemporaryDrawer from "./components/Drawer";
import Table from "./components/Table";
import Landing from "./components/Landing";

import SocketProvider from "./providers/SocketProvider";

import { salads, soups, order1 } from "./mockdata";

export default function App() {
  // const categories = [salads, soups];

  // const categoryMenu = categories.map((category) => {
  //   return (
  //     <MenuItemList
  //       key={category.id}
  //       id={category.id}
  //       name={category.name}
  //       menuItems={category.menuItems}
  //     ></MenuItemList>
  //   );
  // });

  return (
    <div className="App">
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/landing*" element={<Landing />} />
            {/* <Route path="/test" element={<App />} /> */}
            <Route
              path="/current-order"
              element={
                <>
                  <TemporaryDrawer />
                  <CurrentOrder
                    id={order1.id}
                    group={order1.group}
                    table={order1.table}
                    timePlaced={order1.timePlaced}
                    orderFoodItems={order1.orderFoodItems}
                  />
                </>
              }
            />
            <Route
              path="/menu"
              element={
                <>
                  <TemporaryDrawer />
                  <Menu />
                </>
              }
            />
            <Route
              path="/table"
              element={
                <>
                  <TemporaryDrawer />
                  <Table />
                </>
              }
            />
            <Route
              path="/bill"
              element={
                <>
                  <TemporaryDrawer />
                </>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}
