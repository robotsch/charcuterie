import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";

export default function Employee() {
  return (
    <SideBar>
      <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
        <TablesStatus />
      </Box>
      <LiveOrderList />
    </SideBar>
  );
}
