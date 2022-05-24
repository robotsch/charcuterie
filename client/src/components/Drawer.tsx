import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Link from "@mui/material/Link";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useTheme } from "@mui/material/styles";

import { ColorModeContext } from "../providers/ColorModeProvider";
import { Palette } from "@mui/icons-material";

type Anchor = "top";

export default function TemporaryDrawer() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const restaurantName = localStorage.getItem("restaurantName");

  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: "Menu", icon: <MenuBookIcon />, link: "/menu" },
          // {
          //   text: "Current Order",
          //   icon: <ListAltIcon />,
          //   link: "/current-order",
          // },
          { text: "Bill / Pay Now", icon: <AttachMoneyIcon />, link: "/bill" },
        ].map((pair) => (
          <ListItem
            sx={
              theme.palette.mode === "dark"
                ? { color: "#fff" }
                : { color: "#000" }
            }
            key={pair.text}
            component={Link}
            href={pair.link}
          >
            <ListItemButton>
              <ListItemIcon>{pair.icon}</ListItemIcon>
              <ListItemText primary={pair.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <img
          src="https://cdn.discordapp.com/attachments/856696248111595541/978644697213980722/logo.png"
          alt="Logo"
        />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button onClick={toggleDrawer("top", true)}>
        <MenuIcon />
      </Button>
      <span id="restaurant-name">{restaurantName}</span>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <Drawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
      >
        {list("top")}
      </Drawer>
    </Box>
  );
}
