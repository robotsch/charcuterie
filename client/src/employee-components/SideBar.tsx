import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

const drawerWidth = 240;

export default function SideBar(props: any) {
  let navigate = useNavigate();

  const toHome = () => {
    let path = `/employee/testing`;
    navigate(path);
  };
  const toMenu = () => {
    let path = `/employee/menu`;
    navigate(path);
  };
  const toHistory = () => {
    let path = `/employee/history`;
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ width: "100%" }}>
          <img
            src="https://cdn.discordapp.com/attachments/856696248111595541/978644697213980722/logo.png"
            alt="Logo"
            id="employee-logo"
          />
        </Toolbar>
        <Divider />
        <List>
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={toHome}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Order History" disablePadding>
            <ListItemButton onClick={toHistory}>
              <ListItemIcon>
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText primary="Order History" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Menu" disablePadding>
            <ListItemButton onClick={toMenu}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Box
          sx={{
            position: "absolute",
            bottom: "30px",
            left: "55px",
          }}
        >
          <Button variant="contained">
            <LogoutIcon />
            Log out
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ display: "flex", bgcolor: "background.default", p: 3 }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
