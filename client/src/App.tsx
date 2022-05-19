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

import Employee from "./employee-components/Employee";

import useSocket from "./hooks/useSocket";

import RestaurantProvider from "./providers/RestaurantProvider";
import TableProvider from "./providers/TableProvider";

import { salads, soups, order1 } from "./mockdata";

export default function App() {
  const { user, users, setName } = useSocket();

  return (
    <div>
      <RestaurantProvider>
        <TableProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/landing/*"
                element={<Landing {...{ user, users, setName }} />}
              />
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
              <Route
                path="/employee"
                element={
                  <>
                    <Employee />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </TableProvider>
      </RestaurantProvider>
    </div>
  );
}
