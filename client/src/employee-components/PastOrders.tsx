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
  const orderTotalCalc = function (customerArr: Array) {
    let total = 0;
    for (const customer in customerArr) {
      customer.sub_orders.map((item) => {
        total += item.quantity * item.price;
      });
    }
  };

  const [orders, setOrders] = useState({});
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    // axios
    // .get(
    //   `http://localhost:3001/api/menu?id=${localStorage.getItem(
    //     "restaurant"
    //   )}`
    // )
    axios
      .get(
        `http://localhost:3001/api/get-orders-restaurant?id=6283f1d9804b848eb5e4560c`
      )
      .then((res) => {
        setOrders(res.data);
        setCustomers(res.data.customers);
        console.log("Result: ", res);
        console.log("orders: ", orders);
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
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orders) &&
              orders.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell align="right">{row.table_id}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
