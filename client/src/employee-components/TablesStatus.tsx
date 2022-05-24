import React from "react";
import ReactDOM from "react-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddNewTable from "./AddNewTable";
import CreateQrCode from "./CreateQrCode";
import { List, Typography } from "@mui/material";
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

  useEffect(() => {
    // axios
    // .get(
    //   `http://localhost:3001/api/menu?id=${localStorage.getItem(
    //     "restaurant"
    //   )}`
    // )
    axios
      .get(`/api/get-tables?id=6283f1d9804b848eb5e4560c`)
      // .get(
      //   `/api/get-orders-restaurant?id=6283f1d9804b848eb5e4560c`
      // )
      .then((res) => {
        setTables(res.data);

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
      <Typography variant="body1" align="right">
        <AddNewTable
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Typography>
    </>
  );
}
