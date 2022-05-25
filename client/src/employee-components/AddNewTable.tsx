import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-overlays/Modal";
import styled from "styled-components";
//import QrLoader from "./QrLoader";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert } from "@mui/material";

export default function AddNewTable(props: any) {
  const { setShowAlert, setTables, counter, setCounter } = props;

  const createTable = () => {
    setCounter(counter + 1);

    axios
      .post(`http://localhost:3001/api/add-table`, {
        readable_id: counter,
      })
      .then((res) => {
        console.log("add table res: ", res.data);

        axios
          .get(
            `http://localhost:3001/api/names?restaurant=6283f1d9804b848eb5e4560c&table=${res.data.insertedId}`
          )
          .then((result) => {
            console.log("readable names res: ", result.data);
            setShowAlert(true);

            setTimeout(() => {
              setShowAlert(false);
            }, 3000);

            const tableObj = {
              _id: res.data.insertedId,
              readable_name: result.data.table,
            };
            setTables((prev: any) => [...prev, tableObj]);
          })
          .catch((err) => console.log("ERROR", err));
      })
      .catch((err) => console.log("ERROR", err));
  };

  // const generateQrCode = function () {
  //   axios
  //     .get(`http://localhost:3001/api/qr-generate`, {
  //       // restaurant: restaurant,
  //       // table: table,
  //     })
  //     .then((res) => {
  //       console.log("qr: ", res.data);
  //       setQrCode(res.data);
  //     })
  //     .catch((err) => console.log("ERROR", err));
  // };

  return (
    <Button
      sx={{ width: 200, height: 35 }}
      color="success"
      variant="contained"
      type="button"
      onClick={createTable}
    >
      Add Table
    </Button>
  );
}
