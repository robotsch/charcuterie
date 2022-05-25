import React from "react";
import ReactDOM from "react-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { List, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import AddNewTable from "./AddNewTable";
import CreateQrCode from "./CreateQrCode";

import { useState, useContext, useEffect } from "react";
import axios from "axios";

function createData(id: string, status: string) {
  return { id, status };
}

const rows = [
  createData("1", "Active"),
  createData("2", "Pending"),
  createData("3", "Closed"),
];

export default function TablesStatus() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tables, setTables] = useState({});
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get-tables?id=6283f1d9804b848eb5e4560c`)
      // .get(
      //   `/api/get-orders-restaurant?id=6283f1d9804b848eb5e4560c`
      // )
      .then((res) => {
        setTables(res.data);
        setCounter(res.data.length + 1);

        console.log("Result: ", res);
        console.log("tables: ", tables);
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return (
    <>
      <Typography variant="body1">Tables</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Table</TableCell>
              <TableCell align="right">QR Code Generator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(tables) &&
              tables.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.readable_name}
                  </TableCell>
                  <TableCell align="right">
                    <CreateQrCode
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      table={row._id}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}
      >
        <AddNewTable
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setTables={setTables}
          tables={tables}
          counter={counter}
          setCounter={setCounter}
        />
      </Box>
    </>
  );
}
