import { useState, useEffect } from "react";
import LiveOrder from "./ListOrder";
import { List, Typography } from "@mui/material";
import { orderList } from "../mockdata";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ws from "../sockets/socket";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function LiveOrderList() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
<<<<<<< HEAD
    ws.emit("EMPLOYEE", "restaurant");
=======
    ws.emit("EMPLOYEE", { restaurant: "1" });
>>>>>>> 102792c67090b240c2e54c3b12b4ed48071b5664

    ws.on("SUBMIT_ORDER", (order) => {
      // console.log(order);
      setOrders((prev) => [...prev, order]);
    });

    ws.on("DB_TEST", (res) => {
      console.log("result: ", res);
    });

    return () => {
      ws.off("SUBMIT_ORDER");
      ws.off("DB_TEST");
    };
  }, []);

  const renderedOrders = orders.map((order) => {
    return (
      <>
        {Object.keys(order).map((name) => {
          return (
            <>
              <Typography variant="body1">{name}</Typography>
              <LiveOrder key={name} {...order[name]} />
            </>
          );
        })}
      </>
    );
  });

  return (
    <>
<<<<<<< HEAD
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          Tables Current Groups
        </Box>

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography paragraph>
            <button
              onClick={() => {
                ws.emit("SUBMIT_ORDER");
                ws.emit("DB_TEST");
              }}
            >
              Test
            </button>
            <Typography variant="h4">Live Order Feed</Typography>
            {renderedOrders}
          </Typography>
        </Box>
      </Box>
=======
      <Typography variant="h4">Live Order Feed</Typography>
      {renderedOrders}
>>>>>>> 102792c67090b240c2e54c3b12b4ed48071b5664
    </>
  );
}

