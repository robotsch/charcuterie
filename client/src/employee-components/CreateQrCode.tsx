import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-overlays/Modal";
import styled from "styled-components";
//import QrLoader from "./QrLoader";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import axios from "axios";

import CircleIcon from "@mui/icons-material/Circle";

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

const CreateQrCode = (props: any) => {
  const [qrCode, setQrCode] = useState("");
  const [show, setShow] = useState(false);
  const [tableName, setTableName] = useState("");
  const renderBackdrop = (props: any) => <Backdrop {...props} />;
  const table = props.table;

  const generateQrCode = function (table_id: string) {
    axios
      .get(
        `/api/names?restaurant=${localStorage.getItem(
          "restaurant"
        )}&table=${table}`
      )
      .then((res) => {
        setTableName(res.data.table);
        axios
          .post(`/api/qr-generate`, {
            // restaurant: restaurant,
            table: table_id,
          })
          .then((data) => {
            console.log("qr: ", data.data);
            setQrCode(data.data);
          })
          .catch((err) => console.log("ERROR", err));
      });
  };

  return (
    <div className="modal-example">
      <Button
        color="primary"
        variant="outlined"
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => {
          setShow(true);
          {
            generateQrCode(table);
          }
        }}
      >
        Generate QR code
      </Button>
      <PositionedModal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
      >
        <Box>
          <Box
            sx={{
              mb: 2,
            }}
          >
            <CircleIcon fontSize="small" sx={{ mr: 2 }} />
            <span className="mont subheader">{`Table ${tableName}`}</span>
          </Box>
          <Divider sx={{ width: "95%", mx: "auto" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img src={qrCode}></img>
          </Box>
        </Box>
      </PositionedModal>
    </div>
  );
};

export default CreateQrCode;
