import React from "react";
import ReactDOM from "react-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { List, Typography, Alert, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";

import AddNewTable from "./AddNewTable";
import CreateQrCode from "./CreateQrCode";

import { useState, useContext, useEffect } from "react";
import axios from "axios";

interface Table {
  _id: string;
  readable_name: string;
}

export default function TablesStatus() {
  const [tables, setTables] = useState<Array<Table>>([]);
  const [counter, setCounter] = useState(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    axios
      // .get(`http://localhost:3001/api/get-tables?id=6283f1d9804b848eb5e4560c`)
      .get(`/api/get-tables?id=${localStorage.getItem("restaurant")}`)
      .then((res) => {
        setTables(res.data);
        setCounter(res.data.length + 1);
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
            <span className="mont header">Tables</span>
          </Box>
          <AddNewTable
            setTables={setTables}
            counter={counter}
            setCounter={setCounter}
            setShowAlert={setShowAlert}
          />
        </Box>
        <Table>
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
                    <CreateQrCode table={row._id} />
                  </TableCell>
                </TableRow>
              ))}
            {tables.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row">
                  No tables
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showAlert && (
        <Alert
          sx={{ position: "fixed", width: 300, bottom: "10vh", left: 300 }}
          severity="success"
        >
          New Table Added!
        </Alert>
      )}
    </Box>
  );
}
