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
import ListAltIcon from '@mui/icons-material/ListAlt';

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
          { text: "View Current Order", icon: <ListAltIcon /> },
          { text: "view Table", icon: <TableRestaurantIcon /> },
          { text: "View Bill / Pay Now", icon: <AttachMoneyIcon /> },
        ].map((pair) => (
          <ListItem key={pair.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {pair.icon}
              </ListItemIcon>
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
    <div>
      <React.Fragment key="top">
        <Button onClick={toggleDrawer("top", true)}>
          <MenuIcon />
        </Button>
        <h2 className="mont">The Red Blossom</h2>
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
