import React, { useState } from "react";
import ReactDOM from "react-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddNewTable from "./AddNewTable";
import { List, Typography } from "@mui/material";

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
  return (
    <>
      <Typography variant="body1">Tables</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Table</TableCell>
              <TableCell align="right">Status</TableCell>
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
                <TableCell align="right">{row.status}</TableCell>
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
