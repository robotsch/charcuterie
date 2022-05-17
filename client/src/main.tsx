import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import CurrentOrder from "./components/CurrentOrder";
import Menu from "./components/Menu";
import TemporaryDrawer from "./components/Drawer";
import Table from "./components/Table";

import { order } from "./mockdata";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/current-order"
          element={
            <>
              <TemporaryDrawer />
              <CurrentOrder
                id={order.id}
                group={order.group}
                table={order.table}
                timePlaced={order.timePlaced}
                orderFoodItems={order.orderFoodItems}
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
