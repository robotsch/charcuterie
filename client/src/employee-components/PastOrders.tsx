import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fragment, useState, useContext, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CircleIcon from "@mui/icons-material/Circle";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

import { List, Typography, Button } from "@mui/material";

import { Bill as BillInterface } from "../components/bill-components/bill_interface";

interface SubOrder {
  menu_item_id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}
interface Customer {
  name: string;
  sub_orders: SubOrder[];
}

interface Order {
  _id: string;
  table_id: string;
  customers: Customer[];
  status: string;
  restaurant_id: string;
}

function Row(props: any) {
  const { order, index } = props;
  const [open, setOpen] = useState<boolean>(false);

  const orderTotalCalc = function (customerArr: any) {
    let total = 0;
    for (const customer of customerArr) {
      customer.sub_orders.map((item: any) => {
        total += item.quantity * item.totalPrice;
      });
    }

    return (total / 100).toFixed(2);
  };

  const combineOrders = function (customers: Customer[]) {
    const parsedBill: BillInterface = {};
    let total = 0;

    customers.forEach((customer: Customer) => {
      customer.sub_orders.forEach((subOrder: SubOrder) => {
        if (parsedBill[subOrder.menu_item_id] === undefined) {
          parsedBill[subOrder.menu_item_id] = {
            menu_item_id: subOrder.menu_item_id,
            name: subOrder.name,
            quantity: 0,
            totalPrice: 0,
          };
        }
        parsedBill[subOrder.menu_item_id].quantity += subOrder.quantity;
        total += subOrder.totalPrice;
        parsedBill[subOrder.menu_item_id].totalPrice += subOrder.totalPrice;
      });
    });

    return { parsedBill, total };
  };

  const { parsedBill, total } = combineOrders(order.customers);

  return (
    <Fragment key={order._id}>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="right">${orderTotalCalc(order.customers)}</TableCell>
        <TableCell align="center">
          {order.status === "Pending" && (
            <Button variant="contained" color="warning" sx={{width: '60%'}}>
              Pending
            </Button>
          )}
          {order.status === "Completed" && (
            <Button variant="contained" color="success" sx={{width: '60%'}}>
              Completed
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1, pb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 5,
                  mt: 2,
                }}
              >
                <Typography variant="h6">Order Details</Typography>
                <Typography variant="body2">
                  Ordered on: {order.time}
                </Typography>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Price Each</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(parsedBill).map((menuItem) => (
                    <TableRow key={menuItem.menu_item_id}>
                      <TableCell component="th" scope="row">
                        {menuItem.name}
                      </TableCell>
                      <TableCell align="center">{menuItem.quantity}</TableCell>
                      <TableCell align="right">
                        $
                        {(
                          menuItem.totalPrice /
                          menuItem.quantity /
                          100
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        ${(menuItem.totalPrice / 100).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right">
                      ${(total / 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">Tax</TableCell>
                    <TableCell align="right">
                      ${((total * 0.13) / 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">
                      ${((total * 1.13) / 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function PastOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(
        // `http://localhost:3001/api/get-orders-restaurant?id=${localStorage.getItem(
        //   "restaurant"
        // )}`
        `/api/get-orders-restaurant?id=${localStorage.getItem("restaurant")}`
      )
      .then((res) => {
        setOrders(res.data);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box>
              <CircleIcon fontSize="small" sx={{ mr: 2 }} />
              <span className="mont header">Past Orders</span>
            </Box>
            <Button
              startIcon={<RefreshIcon />}
              color="info"
              variant="contained"
              sx={{ height: 40 }}
              onClick={() => {
                axios
                  .get(
                    // `http://localhost:3001/api/get-orders-restaurant?id=${localStorage.getItem(
                    //   "restaurant"
                    // )}`
                    `/api/get-orders-restaurant?id=${localStorage.getItem(
                      "restaurant"
                    )}`
                  )
                  .then((res) => {
                    setOrders(res.data);
                  })
                  .catch((err) => console.log("ERROR", err));
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order #</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {Array.isArray(orders) &&
                orders.map((order: Order, index: number) => {
                  return <Row key={order._id} index={index} order={order} />;
                })}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    No past orders
                  </TableCell>
                </TableRow>
              )}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
