import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeLogin from "./EmployeeLogin";
import { CircularProgress } from "@mui/material";

export default function Employee() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const origin = "/api/session";
    // const origin = "http://localhost:3001/api/session";

    axios
      .get(origin, { withCredentials: true })
      .then((data) => {
        if (data.data.isLoggedIn) {
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));

    setLoading(false)
  }, []);

  return (
    <div>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        loggedIn ? (
            <SideBar>
              <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
                <TablesStatus />
              </Box>
              <LiveOrderList />
            </SideBar>
          ) : (
            <EmployeeLogin />
          )
        )}
    </div>
  );
}
