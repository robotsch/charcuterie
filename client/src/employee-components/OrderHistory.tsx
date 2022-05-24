import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import LiveOrderList from "./LiveOrderList";
import PastOrders from "./PastOrders";

export default function OrderHistory() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <PastOrders />
      </Box>
      {/* <LiveOrderList /> */}
    </Box>
  );
}
