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

import { useState, useEffect } from "react";

type TipType = "PERCENT" | "AMOUNT";

export default function Bill() {
  const [tipType, setTipType] = useState<TipType>("PERCENT");
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [percent, setPercent] = useState<number>(10);
  const [helperText, setHelperText] = useState<string>("");
  // /api/get-order?id=tableid

  useEffect(() => {
    setTipAmount(10 * (percent / 100));
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
        <span className="mont">Bill</span>
      </Box>
      <Divider sx={{ width: "90%" }} />
      Items
      <Divider sx={{ width: "80%" }} />
      Tips
      <Divider sx={{ width: "80%" }} />
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
          label="Amount"
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
          }}
        >
          <FormControl>
            <InputLabel id="percent-amount-select">Age</InputLabel>
            <Select
              labelId="percent-amount-select"
              id="demo-simple-select"
              value={percent}
              defaultValue={10}
              label="Age"
              onChange={(event) => {
                const percentPicked =
                  typeof event.target.value === "string"
                    ? 0
                    : event.target.value;
                setPercent(percentPicked);
                setTipAmount(10 * (percentPicked / 100));
              }}
            >
              <MenuItem value={10}>10%</MenuItem>
              <MenuItem value={15}>15%</MenuItem>
              <MenuItem value={20}>20%</MenuItem>
            </Select>
          </FormControl>
          <Box> x total = ${(10 * (percent / 100)).toFixed(2)}</Box>
        </Box>
      )}
      {tipType === "AMOUNT" && (
        <Box>
          <TextField
            required
            type="number"
            variant="outlined"
            placeholder="$"
            helperText={helperText}
            onChange={(event) => {
              console.log(event.target.value);
              const amount = parseInt(event.target.value);

              console.log(amount);
              if (amount === NaN) {
                setHelperText("Tip amount must be a number");
                return;
              }

              setTipAmount(amount);
            }}
          ></TextField>
        </Box>
      )}
      Totals
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
      <Button variant="contained" color="secondary">
        Pay Now With Card
      </Button>
    </Box>
  );
}
