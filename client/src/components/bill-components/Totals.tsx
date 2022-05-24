import {
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableRow,
  TableCell,
} from "@mui/material";

export default function Totals(props: any) {
  const { tipAmount } = props;
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "80%", margin: "auto" }}>
        <TableBody>
          {[
            { type: "Subtotal", amount: 2 },
            { type: "Tax", amount: 2 },
            { type: "Tips", amount: tipAmount },
            { type: "Total", amount: 2 },
          ].map((row) => (
            <TableRow
              key={row.type}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="right">${row.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
