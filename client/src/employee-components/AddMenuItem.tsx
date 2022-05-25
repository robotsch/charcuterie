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
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import Divider from "@mui/material/Divider";

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
  top: 20%;
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

  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handleCategory = (e: any) => {
    setCategory(e.target.value);
  };
  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };
  const handleImage = (e: any) => {
    setImage(e.target.value);
  };
  const handleDescription = (e: any) => {
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
      .post(`/api/add-menu-item`, {
        price: price,
        name: name,
        description: description,
        image_url: image,
        category: category,
        restaurant_id: localStorage.getItem("restaurant"),
      })
      .then((res) => {
        console.log("add item res: ", res.data);

        // setTables((prev) => [...prev, ])

        axios
          .get(`/api/menu?id=${localStorage.getItem("restaurant")}`)
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
        sx={{ width: 200, height: 35 }}
        color="success"
        variant="contained"
        onClick={() => setShow(true)}
      >
        Add Item
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
            <span className="mont subheader">Add New Item</span>
          </Box>
          <Divider sx={{ width: "95%", mx: "auto" }} />
          <List sx={{ my: 1 }}>
            <ListItem key="name">
              <TextField
                id="standard-basic-required"
                label="Name"
                variant="outlined"
                value={name}
                onChange={handleName}
              />
            </ListItem>
            <ListItem key="category">
              <TextField
                id="standard-basic-required"
                label="Category"
                variant="outlined"
                value={category}
                onChange={handleCategory}
              />
            </ListItem>
            <ListItem key="price">
              <TextField
                id="standard-basic"
                label="Price in cents"
                variant="outlined"
                value={price}
                onChange={handlePrice}
              />
            </ListItem>
            <ListItem key="image">
              <TextField
                id="standard-basic"
                label="ImageURL"
                variant="outlined"
                value={image}
                onChange={handleImage}
              />
            </ListItem>
            <ListItem key="description">
              <TextField
                id="standard-basic"
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleDescription}
              />
            </ListItem>
          </List>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              type="button"
              color="error"
              onClick={() => setShow(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="button"
              color="success"
              variant="outlined"
              onClick={() => {
                addItem(price, name, description, image, category);
                setShow(false);
              }}
            >
              Accept
            </Button>
          </Box>
        </Box>
      </PositionedModal>
    </div>
  );
};

export default AddMenuItem;
