import * as dotenv from "dotenv";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

import Menu from "./components/Menu";
import TemporaryDrawer from "./components/Drawer";
import Landing from "./components/Landing";
import Bill from "./components/bill-components/Bill";

import Employee from "./employee-components/Employee";
import EmployeeTesting from "./employee-components/EmployeeTesting";
import EmployeeLogin from "./employee-components/EmployeeLogin";

import { CssBaseline } from "@mui/material";

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/landing/*" element={<Landing />} />
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
            path="/bill"
            element={
              <>
                <TemporaryDrawer />
                <Bill />
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
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/testing" element={<EmployeeTesting />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
