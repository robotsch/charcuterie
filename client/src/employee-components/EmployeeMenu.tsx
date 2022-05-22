import SideBar from "./SideBar";
import Box from "@mui/material/Box";

import EmployeeMenuItems from "./EmployeeMenuItems";

export default function EmployeeMenu() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 0.5,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <EmployeeMenuItems />
      </Box>
    </Box>
  );
}
