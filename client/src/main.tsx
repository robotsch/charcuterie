import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import CurrentOrder from "./components/CurrentOrder";
import Menu from "./components/Menu";
import TemporaryDrawer from "./components/Drawer";
import Table from "./components/Table";
import Landing from "./components/Landing";

import { order1 } from "./mockdata";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/landing*" element={<Landing />} />
        <Route path="/test" element={<App />} />
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
  </React.StrictMode>
);
