import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-overlays/Modal";
import styled from "styled-components";
//import QrLoader from "./QrLoader";
import Button from "@mui/material/Button";
import axios from "axios";

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

const PositionedModal = styled(Modal)`
  position: fixed;
  width: 400px;
  z-index: 1040;
  top: 35%;
  left: 35%;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

export default function AddNewTable(props: any) {
  const [show, setShow] = useState(false);
  const renderBackdrop = (props: any) => <Backdrop {...props} />;
  const setTables = props.setTables;
  // const readable_id = props.counter + 1;
  const counter = props.counter;
  const setCounter = props.setCounter;

  const createTable = function () {
    setCounter(counter + 1);

    axios
      .post(`http://localhost:3001/api/add-table`, {
        readable_id: counter,
      })
      .then((res) => {
        console.log("add table res: ", res.data);

        // setTables((prev) => [...prev, ])

        axios
          .get(
            `http://localhost:3001/api/names?restaurant=6283f1d9804b848eb5e4560c&table=${res.data.insertedId}`
          )
          .then((result) => {
            console.log("readable names res: ", result.data);
            let tableObj = {
              _id: res.data.insertedId,
              readable_name: result.data.table,
            };
            setTables((prev) => [...prev, tableObj]);
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
    <div className="modal-example">
      <Button
        color="success"
        variant="outlined"
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => {
          setShow(true);
          createTable();
        }}
      >
        Add Table
      </Button>
      <PositionedModal
        show={show}
        onHide={() => {
          setShow(false);
          // window.location.reload();
        }}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
      >
        <div>Table Added!</div>
      </PositionedModal>
    </div>
  );
}
