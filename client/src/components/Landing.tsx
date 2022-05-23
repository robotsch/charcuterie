import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { Link, useSearchParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

import { restaurantContext } from "../providers/RestaurantProvider";
import { tableContext } from "../providers/TableProvider";
import { ConnectedTvTwoTone } from "@mui/icons-material";

import UserList from "./UserList";

import ws from "../sockets/socket";

import "./Landing.scss";

import { ColorModeContext } from "../App";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type LandingMode = "LANDING" | "NAME_ENTERED";
type LandingHeaderMode = "NOT_LOADED" | "LOADED";

export default function Landing() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  axios.defaults.withCredentials = true;

  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [users, setUsers] = useState<any>(localStorage.getItem("users"));

  console.log(user, users);
  const [searchParms, getSearchParams] = useSearchParams();

  const [restaurant, setRestaurant] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");

  const [table, setTable] = useState<string>("");
  const [tableName, setTableName] = useState<string>("");

  const [headerMode, setHeaderMode] = useState<LandingHeaderMode>("NOT_LOADED");
  const [mode, setMode] = useState<LandingMode>("LANDING");

  useEffect(() => {
    setRestaurant(searchParms.get("id1") || "");
    setTable(searchParms.get("id2") || "");
    localStorage.setItem("restaurant", searchParms.get("id1") || "0");
    localStorage.setItem("table", searchParms.get("id2") || "0");
    console.log(restaurant, table);

    ws.emit("CONNECT_TO_ROOM", {
      restaurant: searchParms.get("id1"),
      table: searchParms.get("id2"),
    });

    if (user !== null) {
      setMode("LANDING");
    }

    ws.on("SUBMIT_NAME", (names: string[]) => {
      console.log("SUBMIT_NAME", names);
      setUsers(names);
    });

    return () => {
      ws.off("SUBMIT_NAME");
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/names?restaurant=${restaurant}&table=${table}`
      )
      .then((res) => {
        console.log(res.data);
        setRestaurantName(res.data.restaurant);
        setTableName(res.data.table);
        setHeaderMode("LOADED");
      })
      .catch((err) => console.log("ERROR", err));
  }, [table, restaurant]);

  useEffect(() => {
    if (user && users) {
      setMode("NAME_ENTERED");
      console.log("in useEffect for [user, users]", user, users);
      localStorage.setItem("user", user);
      localStorage.setItem("users", users);
    }
  }, [user, users]);

  return (
    <div>
      {headerMode === "NOT_LOADED" && <div>empty</div>}
      {headerMode === "LOADED" && (
        <div id="header">
          <img
            src="/assets/img/header.jpg"
            alt="Restaurant header image"
            id="header-img"
          />
          <div>
            <div>
              <h1 className="mont">WELCOME TO</h1>
              <span>{restaurantName}</span>
              <h5 className="mont">You are seated at table {tableName}</h5>
            </div>
          </div>
        </div>
      )}
      {mode === "LANDING" && (
        <div id="name-submission">
          <span>Please enter your name:</span>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              const name = event.target[0].value;
              setUser(name);
              ws.emit("SUBMIT_NAME", { name, restaurant, table });
            }}
          >
            <TextField
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              placeholder="(max 15 characters)"
              sx={{ mt: 2 }}
            ></TextField>
            <Button
              color="secondary"
              sx={{ mt: 5, width: "50%" }}
              type="submit"
              variant="contained"
            >
              Next
            </Button>
          </form>
        </div>
      )}
      {mode === "NAME_ENTERED" && (
        <div>
          Hello {user}
          <Link to="/Menu">
            <Button>Menu</Button>
          </Link>
        </div>
      )}
      <UserList users={users} />
      <Button
        type="button"
        onClick={() => {
          console.log(localStorage);
          localStorage.clear();
        }}
      >
        Clear localstorage
      </Button>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
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
      </Box>
    </div>
  );
}
