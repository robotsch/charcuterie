import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import TablePastOrderList from "./TablePastOrderList";

import { orderList } from "../mockdata";

export default function Table() {
  return (
    <Container sx={{ backgroundColor: "orange" }} disableGutters>
      <h1 className="mont">TABLE</h1>
      <Divider />
      //
      <TablePastOrderList orders={orderList.orders} />
    </Container>
  );
}
