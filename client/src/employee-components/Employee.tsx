import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";

import Box from "@mui/material/Box";

export default function Employee() {
  return (
    <Box>
      <SideBar>
        <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
          Tables Current Groups
        </Box>
        <LiveOrderList />
      </SideBar>
    </Box>
  );
}
