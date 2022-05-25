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
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";

import { List, Typography } from "@mui/material";

export default function PastOrders() {
  let counter = 1;

  const orderTotalCalc = function (customerArr: any) {
    let total = 0;
    for (const customer of customerArr) {
      customer.sub_orders.map((item: any) => {
        total += item.quantity * item.price;
      });
    }

    counterAdd();
    return (total / 100).toFixed(2);
  };

  const counterAdd = function () {
    counter++;
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/api/get-orders-restaurant?id=${localStorage.getItem("restaurant")}`
      )
      .then((res) => {
        setOrders(res.data);

        console.log("Result: ", res);
        console.log("orders: ", orders);
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{ width: "50vw", maxWidth: 700, minWidth: 500, px: 2, py: 1 }}
        component={Paper}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box>
            <CircleIcon fontSize="small" sx={{ mr: 2 }} />
            <span className="mont header">Past Orders</span>
          </Box>
        </Box>
        <Table>
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
                    {counter}
                  </TableCell>
                  <TableCell align="right">
                    ${orderTotalCalc(row.customers)}
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row">
                  No past orders
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
