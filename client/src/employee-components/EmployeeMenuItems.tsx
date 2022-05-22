import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function createData(
  image: string,
  name: string,
  category: string,
  price: string
) {
  return { image, name, category, price };
}

const rows = [
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "1",
    "2",
    "39.00"
  ),
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "2",
    "1",
    "21.34"
  ),
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "3",
    "3",
    "123.45"
  ),
];

export default function PastOrders() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.image}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">${row.category}</TableCell>
              <TableCell align="center">${row.price}</TableCell>
              <TableCell align="center">
                <Button color="secondary">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
