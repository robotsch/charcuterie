import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeLogin from "./EmployeeLogin";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LiveOrderList from "./LiveOrderList";
import PastOrders from "./PastOrders";
import EmployeeMenuItems from "./EmployeeMenuItems";

type Page = "HOME" | "ORDER_HISTORY" | "MENU";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#242F36", // charcoal grey complement
//     },
//   },
// });

export default function Employee() {
  const [status, setStatus] = useState("loading");
  const [page, setPage] = useState<Page>("HOME");

  useEffect(() => {
    // const origin = "/api/session";
    const origin = "http://localhost:3001/api/session";
    setStatus("loading");

    axios
      .get(origin, { withCredentials: true })
      .then((data) => {
        if (data.data.restaurant) {
          setStatus(data.data.restaurant);
        } else {
          setStatus("authcheck");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    <div>
      {status === "loading" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300vh"
        >
          <CircularProgress />
        </Box>
      ) : status === "authcheck" ? (
        <EmployeeLogin />
      ) : (
        <SideBar setPage={setPage} setLoggedIn={setStatus}>
          <Box
            component="main"
            sx={{
              bgcolor: "background.default",
              p: 3,
              width: "100%",
              display: "flex",
              justifyContent: "center",
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
    // </ThemeProvider>
  );
}
