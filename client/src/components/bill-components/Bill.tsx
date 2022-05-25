import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import Totals from "./Totals";
// import Items from "./Items";

import { useState, useEffect } from "react";

import axios from "axios";

import "./Bill.scss";

import {
  TipType,
  Bill as BillInterface,
  OrderForTable,
  Customer,
  SubOrder,
} from "./bill_interface";
import { setDefaultResultOrder } from "dns";

export default function Bill() {
  const [tipType, setTipType] = useState<TipType>("PERCENT");
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [percent, setPercent] = useState<number>(10);
  const [helperText, setHelperText] = useState<string>("");
  const [bill, setBill] = useState<BillInterface>({});
  const [subTotal, setSubTotal] = useState<number>(0);

  const [orderIDList, setOrderIDList] = useState<Array<string>>([]);

  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    if (tipType === "PERCENT") {
      setTipAmount((subTotal * percent) / 100);
    } else {
      setTipAmount(0);
    }
  }, [tipType]);

  useEffect(() => {
    axios
      // .get(`/api/get-order?id=${localStorage.getItem("table")}&status=pending`)
      .get(
        `http://localhost:3001/api/get-order?id=${localStorage.getItem(
          "table"
        )}&status=pending`
      )
      .then((res) => {
        const parsedBill: BillInterface = {};
        let newSubTotal = 0;

        console.log(res.data);
        res.data.forEach((order: OrderForTable) => {
          console.log(order._id);
          setOrderIDList((prev) => [...prev, order._id]);
          order.customers.forEach((customer: Customer) => {
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
              newSubTotal += subOrder.totalPrice;
              parsedBill[subOrder.menu_item_id].totalPrice +=
                subOrder.totalPrice;
            });
          });
        });

        setSubTotal(newSubTotal);
        setTipAmount((newSubTotal * percent) / 100);
        // console.log(parsedBill);
        setBill(parsedBill);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <span className="mont header">Your Bill</span>
      </Box>
      <Divider sx={{ width: "90%", mb: 1.5 }} />
      <span className="mont bill-subheader">Items</span>
      <Divider sx={{ width: "85%", mb: 1.5 }} />
      {Object.keys(bill).length !== 0 && (
        <TableContainer sx={{ width: "95%", margin: "auto" }}>
          <Table>
            <TableBody>
              {Object.entries(bill).map(([id, item]) => {
                return (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">
                      ${(item.totalPrice / item.quantity / 100).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${(item.totalPrice / 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {Object.keys(bill).length === 0 && <Box sx={{ mb: 2 }}>No items</Box>}
      <span className="mont bill-subheader">Tips</span>
      <Divider sx={{ width: "85%", mb: 1.5 }} />
      <RadioGroup
        defaultValue="percent"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <FormControlLabel
          value="percent"
          control={<Radio />}
          label="Percent"
          onClick={() => setTipType("PERCENT")}
        />
        <FormControlLabel
          value="amount"
          control={<Radio />}
          label="Custom Amount"
          onClick={() => setTipType("AMOUNT")}
        />
      </RadioGroup>
      {tipType === "PERCENT" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <FormControl>
            <InputLabel id="percent-amount-select">Tip</InputLabel>
            <Select
              labelId="percent-amount-select"
              id="demo-simple-select"
              value={percent}
              defaultValue={10}
              label="Tip"
              onChange={(event) => {
                const percentPicked =
                  typeof event.target.value === "string"
                    ? 0
                    : event.target.value;
                setPercent(percentPicked);
                setTipAmount(subTotal * (percentPicked / 100));
              }}
            >
              <MenuItem value={10}>10%</MenuItem>
              <MenuItem value={15}>15%</MenuItem>
              <MenuItem value={20}>20%</MenuItem>
            </Select>
          </FormControl>
          <Box>
            {" "}
            x total = ${((subTotal * (percent / 100)) / 100).toFixed(2)}
          </Box>
        </Box>
      )}
      {tipType === "AMOUNT" && (
        <Box>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            required
            type="number"
            variant="outlined"
            placeholder="$"
            onChange={(event) => {
              if (event.target.value === "") {
                setTipAmount(0);
                return;
              }

              const amount = parseFloat(event.target.value) * 100;

              console.log(amount);
              if (amount < 0) {
                setHelperText("Tip amount must be greater or equal to zero");
                return;
              }

              setTipAmount(amount);
              setHelperText("");
            }}
          ></TextField>
          <FormHelperText>{helperText}</FormHelperText>
        </Box>
      )}
      <span className="mont bill-subheader">Totals</span>
      <Divider sx={{ width: "85%", mb: 1.5 }} />
      <Totals tipAmount={tipAmount} subTotal={subTotal} />
      {errorText !== "" && (
        <Alert sx={{ mt: 1.5 }} severity="error">
          {errorText}
        </Alert>
      )}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2, mb: 3 }}
        onClick={() => {
          if (Object.keys(bill).length === 0) {
            setErrorText("Cannot checkout with no items ordered");
            return;
          }
          alert("PAID");
          console.log("order id list", orderIDList);
          axios
            .all(
              orderIDList.map((orderID) => {
                return axios.post(
                  "/api/update-order-status",
                  {
                    id: orderID,
                  }
                );
              })
            )
            .then(() => {
              console.log("ahahaha all done completing these");
              setBill({});
            });
        }}
      >
        Pay Now With Card
      </Button>
    </Box>
  );
}
