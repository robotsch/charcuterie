import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Modal from "react-overlays/Modal";
import styled from "styled-components";

import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

type Anchor = "right";

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

export default function DeleteMenuItem() {
  const [show, setShow] = useState(false);
  const renderBackdrop = (props) => <Backdrop {...props} />;

  return (
    <div className="modal-example">
      <Button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => setShow(true)}
        color="error"
        variant="outlined"
      >
        Delete
      </Button>
      <PositionedModal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
      >
        <div>
          Are you sure you want to delete this item?
          <Button
            type="button"
            className="btn btn-primary mb-4"
            color="success"
            variant="outlined"
          >
            Accept
          </Button>
          <Button
            type="button"
            className="btn btn-primary mb-4"
            color="error"
            variant="outlined"
          >
            Decline
          </Button>
        </div>
      </PositionedModal>
    </div>
  );
}
