import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeLogin from "./EmployeeLogin";

export default function Employee() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // const origin = "/api/session";
    const origin = "http://localhost:3001/api/session";

    axios
      .get(origin, { withCredentials: true })
      .then((data) => {
        if (data.data.isLoggedIn) {
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {loggedIn ? (
        <SideBar>
          <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
            <TablesStatus />
          </Box>
          <LiveOrderList />
        </SideBar>
      ) : (
        <EmployeeLogin />
      )}
    </div>
  );
}
