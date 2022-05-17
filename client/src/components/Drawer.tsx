import * as React from "react";
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
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Link from "@mui/material/Link";

type Anchor = "top";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
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
          {
            text: "Current Order",
            icon: <ListAltIcon />,
            link: "/current-order",
          },
          { text: "Table", icon: <TableRestaurantIcon />, link: "/table" },
          { text: "Bill / Pay Now", icon: <AttachMoneyIcon />, link: "/bill" },
        ].map((pair) => (
          <ListItem
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
      <List>
        <ListItem key="logo" disablePadding>
          <ListItemButton disabled>
            <ListItemText primary="Logo" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div id="drawer">
      <React.Fragment key="top">
        <Button onClick={toggleDrawer("top", true)}>
          <MenuIcon />
        </Button>
        <span id="restaurant-name">
          <span>Red</span> <span>Blossom</span>
        </span>
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
        >
          {list("top")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
