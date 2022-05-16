import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import CurrentOrder from "./components/CurrentOrder";
import Menu from "./components/Menu";

import { categoryMenu, order } from "./mockdata";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/current-order"
          element={
            <CurrentOrder
              group={order.group}
              table={order.table}
              timePlaced={order.timePlaced}
              orderFoodItems={order.orderFoodItems}
            />
          }
        />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
