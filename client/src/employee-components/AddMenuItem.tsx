import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import styled from "styled-components";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Modal from "react-overlays/Modal";
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

const AddMenuItem = (props: any) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const setMenu = props.setMenu;
  const menu = props.menu;

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleImage = (e) => {
    setImage(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const renderBackdrop = (props: any) => <Backdrop {...props} />;

  const addItem = function (
    price: any,
    name: any,
    description: any,
    image: any,
    category: any
  ) {
    axios
      .post(`http://localhost:3001/api/add-menu-item`, {
        price: price,
        name: name,
        description: description,
        image_url: image,
        category: category,
        restaurant_id: "6283f1d9804b848eb5e4560c",
      })
      .then((res) => {
        console.log("add item res: ", res.data);

        // setTables((prev) => [...prev, ])

        axios
          .get(`http://localhost:3001/api/menu?id=6283f1d9804b848eb5e4560c`)
          .then((res) => {
            setMenu(res.data);
          })
          .catch((err) => console.log("ERROR", err));
      })
      .catch((err) => console.log("ERROR", err));
  };

  return (
    <div className="modal-example">
      <Button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => setShow(true)}
        color="success"
        variant="outlined"
      >
        Add Item
      </Button>
      <PositionedModal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
      >
        <div>
          <List>
            <ListItem key="name" disablePadding>
              <TextField
                id="standard-basic-required"
                label="Name"
                variant="standard"
                value={name}
                onChange={handleName}
              />
            </ListItem>
            <ListItem key="category" disablePadding>
              <TextField
                id="standard-basic-required"
                label="Category"
                variant="standard"
                value={category}
                onChange={handleCategory}
              />
            </ListItem>
            <ListItem key="price" disablePadding>
              <TextField
                id="standard-basic"
                label="Price"
                variant="standard"
                value={price}
                onChange={handlePrice}
              />
            </ListItem>
            <ListItem key="image" disablePadding>
              <TextField
                id="standard-basic"
                label="ImageURL"
                variant="standard"
                value={image}
                onChange={handleImage}
              />
            </ListItem>
            <ListItem key="image" disablePadding>
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                value={description}
                onChange={handleDescription}
              />
            </ListItem>
          </List>
          <Button
            type="button"
            className="btn btn-primary mb-4"
            color="success"
            variant="outlined"
            onClick={() => {
              addItem(price, name, description, image, category);
              setShow(false);
            }}
          >
            Accept
          </Button>
          <Button
            type="button"
            className="btn btn-primary mb-4"
            color="error"
            onClick={() => setShow(false)}
            variant="outlined"
          >
            Cancel
          </Button>
        </div>
      </PositionedModal>
    </div>
  );
};

export default AddMenuItem;
