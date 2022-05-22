import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";

export default function Employee() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <TablesStatus />
      </Box>
      <LiveOrderList />
    </Box>
  );
}
