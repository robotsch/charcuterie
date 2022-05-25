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
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

export default function SideBar(props: any) {
  const { setPage } = props;

  const [restaurantName, setRestaurantName] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        // `/api/names/restaurant?restaurant=${localStorage.getItem(
        //   "restaurant"
        // )}`
        `http://localhost:3001/api/names/restaurant?restaurant=${localStorage.getItem(
          "restaurant"
        )}`
      )
      .then((data: any) => {
        setRestaurantName(data.data.restaurant);
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          // flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: "flex",
          alignItems: "center",
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ width: "100%", mt: 4 }}>
          <img
            src="https://cdn.discordapp.com/attachments/856696248111595541/978644697213980722/logo.png"
            alt="Logo"
            id="employee-logo"
          />
        </Toolbar>
        <Divider
          sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", mb: 3 }}
        />
        <List sx={{ mt: 3 }}>
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={() => setPage("HOME")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Order History" disablePadding>
            <ListItemButton onClick={() => setPage("ORDER_HISTORY")}>
              <ListItemIcon>
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText primary="Order History" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Menu" disablePadding>
            <ListItemButton onClick={() => setPage("MENU")}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            pb: 5,
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h6">{restaurantName}</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ height: 50, width: 170, display: "flex", gap: 2 }}
            >
              <LogoutIcon />
              Log out
            </Button>
          </Box>
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
