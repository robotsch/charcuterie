import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { List, Typography } from "@mui/material";

function createData(id: string, tableId: string, total: string) {
  return { id, tableId, total };
}

const rows = [
  createData("1", "2", "39.00"),
  createData("2", "1", "21.34"),
  createData("3", "3", "123.45"),
];

export default function PastOrders() {
  const [orders, setOrders] = useState({});

  useEffect(() => {
    // axios
    // .get(
    //   `http://localhost:3001/api/menu?id=${localStorage.getItem(
    //     "restaurant"
    //   )}`
    // )
    axios
      .get(
        `http://localhost:3001/api/get-order?id=6283f6a703f54b7c82c5fffd&status=active`
      )
      .then((res) => {
        setOrders(res.data);
        console.log("orders: ", orders);
        console.log("Result: ", res);
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return (
    <>
      <Typography variant="body1">Past Orders</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell align="right">Table</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.tableId}</TableCell>
                <TableCell align="right">${row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
