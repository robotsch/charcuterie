import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { useTheme } from "@mui/material";

export default function Bill() {
  return (
    <Box>
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <span className="mont">Bill</span>
      </Box>
      <Divider />
      Items
      <Divider />
      Tips
      <Divider />
      Totals
      <Button variant="contained" color="primary">Pay Now With Card</Button>
    </Box>
  );
}
