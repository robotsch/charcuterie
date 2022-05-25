import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeLogin from "./EmployeeLogin";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";

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
    const origin = "/api/session";
    // const origin = "http://localhost:3001/api/session";
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
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {page === "HOME" && <TablesStatus />}
            {page === "ORDER_HISTORY" && <PastOrders />}
            {page === "MENU" && <EmployeeMenuItems />}
            <Box
              sx={{
                display: "flex",
                width: "60%",
                height: "5em",
                justifyContent: "space-around",
                bgcolor: "white",
                position: "fixed",
                bottom: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  "flex-direction": "column",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <span className="mont">Christian</span>
                <div>
                  <IconButton href="https://github.com/robotsch/">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton href="https://www.linkedin.com/in/christian-humble-bb1949163/">
                    <LinkedInIcon />
                  </IconButton>
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  "flex-direction": "column",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <span className="mont">Francesca</span>
                <div>
                  <IconButton href="https://github.com/otrachea/">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton href="https://www.linkedin.com/in/francesca-h-111714174/">
                    <LinkedInIcon />
                  </IconButton>
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  "flex-direction": "column",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <span className="mont">Elroy</span>
                <div>
                  <IconButton href="https://github.com/letsfighting/">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton href="https://www.linkedin.com/in/elroy-hui-991853bb/">
                    <LinkedInIcon />
                  </IconButton>
                </div>
              </Box>
            </Box>
          </Box>
          <LiveOrderList />
        </SideBar>
      )}
    </div>
  );
}
