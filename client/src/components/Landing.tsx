import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { Link, useSearchParams } from "react-router-dom";

import { restaurantContext } from "../providers/RestaurantProvider";
import { tableContext } from "../providers/TableProvider";
import { ConnectedTvTwoTone } from "@mui/icons-material";

import UserList from "./UserList";

import ws from "../sockets/socket";

type LandingMode = "LANDING" | "NAME_ENTERED";
type LandingHeaderMode = "NOT_LOADED" | "LOADED";

export default function Landing() {
  axios.defaults.withCredentials = true;

  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [users, setUsers] = useState<any>(localStorage.getItem("users"));

  console.log(user, users);
  const [searchParms, getSearchParams] = useSearchParams();

  const [restaurant, setRestaurant] = useState<any>("0");

  const [table, setTable] = useState<any>("0");

  const [headerMode, setHeaderMode] = useState<LandingHeaderMode>("NOT_LOADED");
  const [mode, setMode] = useState<LandingMode>("LANDING");

  useEffect(() => {
    setRestaurant(searchParms.get("id1"));
    setTable(searchParms.get("id2"));
    localStorage.setItem("restaurant", searchParms.get("id1") || "0");
    localStorage.setItem("table", searchParms.get("id2") || "0");

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
    // axios
    //   .get(`http://localhost:3001/api/restaurant/${restaurant}/landing}`)
    //   .get("")
    //   .then((res) => {
    // DO SOMETHING TO RESPONSE HERE
    //    setHeaderMode("LOADED");
    //   );
    // });
    setHeaderMode("LOADED");
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
        <div>
          {/* <img>FOR HEADER IMAGE</img> */}
          <h1>WELCOME TO</h1>
          <span>RED</span>
          <span> BLOSSOM</span>
          <h5>You are seated at table {table}</h5>
        </div>
      )}
      {mode === "LANDING" && (
        <div>
          Please enter your name:
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
              variant="standard"
              placeholder="(max 15 characters)"
            ></TextField>
            <Button type="submit">Confirm</Button>
          </form>
          {/* <UserList users={users} /> */}
        </div>
      )}
      {mode === "NAME_ENTERED" && (
        <div>
          Hello {user}
          <UserList users={users} />
          <Link to="/Menu">
            <Button>Menu</Button>
          </Link>
        </div>
      )}
      <Button
        type="button"
        onClick={() => {
          console.log(localStorage);
          localStorage.clear();
        }}
      >
        Clear localstorage
      </Button>
    </div>
  );
}
