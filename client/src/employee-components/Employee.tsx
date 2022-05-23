import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Employee() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("running");
    axios
      .get("http://localhost:3001/api/session", { withCredentials: true })
      .then((data) => {
        if (data.data.isLoggedIn) {
          setLoading(false);
        } else {
          alert("Alerted");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <SideBar>
      <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
        <TablesStatus />
      </Box>
      <LiveOrderList />
    </SideBar>
  );
}
