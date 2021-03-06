import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-overlays/Modal";
import styled from "styled-components";
//import QrLoader from "./QrLoader";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AddNewTable(props: any) {
  const { setShowAlert, setTables, counter, setCounter } = props;

  const createTable = () => {
    setCounter(counter + 1);

    axios
      .post(`/api/add-table`, {
        readable_id: counter,
      })
      .then((res) => {
        axios
          .get(
            `/api/names?restaurant=${localStorage.getItem(
              "restaurant"
            )}&table=${res.data.insertedId}`
          )
          .then((result) => {
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
      startIcon={<AddCircleIcon />}
    >
      Add Table
    </Button>
  );
}
