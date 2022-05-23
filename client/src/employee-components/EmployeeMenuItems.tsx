import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { List, Typography } from "@mui/material";
import EditMenuItem from "./EditMenuItem";
import AddMenuItem from "./AddMenuItem";

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
    "miso soup",
    "soup",
    "3.99"
  ),
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "tuna rolls",
    "rolls",
    "14.99"
  ),
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "salmon handroll",
    "handroll",
    "9.99"
  ),
];

export default function EmployeeMenuItems() {
  return (
    <>
      <Typography variant="body1">Menu</Typography>
      <Typography variant="body1" align="right">
        <AddMenuItem />
      </Typography>
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
                  <img src={row.image} width={100} height={100} alt="food" />
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">${row.price}</TableCell>
                <TableCell align="center">
                  <EditMenuItem />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
