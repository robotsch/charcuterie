import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeLogin from "./EmployeeLogin";
import EmployeeMenuItems from "./EmployeeMenuItems";
import PastOrders from "./PastOrders";

type Page = "HOME" | "ORDER_HISTORY" | "MENU";

export default function Employee() {
  const [page, setPage] = useState<Page>("HOME");

  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <div>
      {!loggedIn && <EmployeeLogin />}
      {loggedIn && (
        <SideBar setPage={setPage} setLoggedIn={setLoggedIn}>
          <Box
            component="main"
            sx={{
              bgcolor: "background.default",
              p: 3,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {page === "HOME" && <TablesStatus />}
            {page === "ORDER_HISTORY" && <PastOrders />}
            {page === "MENU" && <EmployeeMenuItems />}
          </Box>
          <LiveOrderList />
        </SideBar>
      )}
    </div>
  );
}
