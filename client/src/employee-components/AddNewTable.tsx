import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-overlays/Modal";
import styled from "styled-components";
import QrLoader from "./QrLoader";
import Button from "@mui/material/Button";

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

const AddNewTable = (props) => {
  const [show, setShow] = useState(false);
  const renderBackdrop = (props) => <Backdrop {...props} />;

  return (
    <div className="modal-example">
      <Button
        color="success"
        variant="outlined"
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => setShow(true)}
      >
        Add Table
      </Button>
      <PositionedModal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
      >
        <div>
          Insert QR Code Here:
          {/* <QrLoader /> */}
        </div>
      </PositionedModal>
    </div>
  );
};

export default AddNewTable;
