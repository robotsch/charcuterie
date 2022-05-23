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

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { ColorModeContext } from "../providers/ColorModeProvider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type LandingMode = "LANDING" | "NAME_ENTERED";
type LandingHeaderMode = "NOT_LOADED" | "LOADED";

export default function Landing(props: any) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  axios.defaults.withCredentials = true;

  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [users, setUsers] = useState<any>(localStorage.getItem("users"));

  console.log(user, users);
  const [searchParms, getSearchParams] = useSearchParams();

  const [restaurant, setRestaurant] = useState<string>("");
  const { restaurantName, setRestaurantName } = props;

  const [table, setTable] = useState<string>("");
  const [tableName, setTableName] = useState<string>("");

  const [headerMode, setHeaderMode] = useState<LandingHeaderMode>("NOT_LOADED");
  const [mode, setMode] = useState<LandingMode>("LANDING");

  const [helperText, setHelperText] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

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
        // `/api/names?restaurant=${restaurant}&table=${table}`
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
            src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Restaurant header image1"
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
        <Box
          id="name-submission"
          sx={{
            py: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Please enter your name:</span>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              const name = event.target[0].value;
              if (name === "") {
                setHelperText("Name required");
                setNameError(true);
                return;
              }

              if (name.length > 15) {
                setHelperText("Name cannot be more than 15 characters");
                setNameError(true);
                return;
              }

              setUser(name);
              ws.emit("SUBMIT_NAME", { name, restaurant, table });
            }}
          >
            <TextField
              error={nameError}
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              placeholder="(max 15 characters)"
              onChange={(event: any) => {
                const name = event.target.value;

                if (name === "") {
                  setHelperText("Name required");
                  setNameError(true);
                  return;
                }

                if (name.length > 15) {
                  setHelperText("Name cannot be more than 15 characters");
                  setNameError(true);
                  return;
                }

                setHelperText("");
                setNameError(false);
              }}
              sx={{ mt: 2 }}
              helperText={helperText}
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
        </Box>
      )}
      {mode === "NAME_ENTERED" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: 2,
            gap: 1,
          }}
        >
          <Typography>Welcome {user}!</Typography>
          <Typography sx={{ textAlign: "center" }}>
            Once everyone has joined the table below, everyone can click on the
            Menu button!
          </Typography>
          <Box sx={{ p: 2 }}>
            <UserList users={users} />
          </Box>
          <Link to="/Menu">
            <Button sx={{ width: 120, height: 40 }} variant="contained">
              Menu
            </Button>
          </Link>
        </Box>
      )}
      {/* <Button
        type="button"
        variant="contained"
        onClick={() => {
          console.log(localStorage);
          localStorage.clear();
        }}
      >
        Clear localstorage
      </Button> */}
    </div>
  );
}
