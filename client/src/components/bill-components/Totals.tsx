import {
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableRow,
  TableCell,
} from "@mui/material";

export default function Totals(props: any) {
  const { tipAmount, subTotal } = props;

  return (
    <TableContainer component={Paper} sx={{ width: "80%", margin: "auto" }}>
      <Table>
        <TableBody>
          {[
            { type: "Subtotal", amount: subTotal },
            { type: "Tax", amount: subTotal * 0.13 },
            { type: "Tips", amount: tipAmount },
            { type: "Total", amount: tipAmount + subTotal * 1.13 },
          ].map((row) => (
            <TableRow
              key={row.type}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="right">${(row.amount / 100).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
