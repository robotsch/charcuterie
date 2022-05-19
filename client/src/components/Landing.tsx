import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useSearchParams } from "react-router-dom";

import { restaurantContext } from "../providers/RestaurantProvider";
import { tableContext } from "../providers/TableProvider";
import { ConnectedTvTwoTone } from "@mui/icons-material";

import UserList from "./UserList";

export default function Landing(props: any) {
  axios.defaults.withCredentials = true;

  const { user, users, sendNewUser, setName } = props;

  const [searchParms, getSearchParams] = useSearchParams();

  const [landingHeader, setLandingHeader] = useState(<h1>Placeholder</h1>);

  const { restaurant, setRestaurant } = useContext(restaurantContext);

  const { table, setTable } = useContext(tableContext);

  // useEffect(() => {
  //   // setRestaurant(searchParms.get("id1"));
  //   // setTable(searchParms.get("id2"));
  //   // axios
  //   //   .get(`http://localhost:3001/api/restaurant/${restaurant}/landing}`)
  //   //   .get("")
  //   //   .then((res) => {
  //   // DO SOMETHING TO RESPONSE HERE
  //   //   landingHeader = (
  //   //     <div>
  //   //       <h1>WELCOME TO</h1>
  //   //       <span>RED</span>
  //   //       <span>BLOSSOM</span>
  //   //       <h5>You are seated at table {table}</h5>
  //   //     </div>
  //   //   );
  //   // });
  //   setLandingHeader(
  //     <div>
  //       <h1>WELCOME TO</h1>
  //       <span>RED</span>
  //       <span> BLOSSOM</span>
  //       <h5>You are seated at table {table}</h5>
  //     </div>
  //   );

  //   // ws.current = io("http://localhost:3001", {
  //   //   query: { restaurant, table },
  //   // });
  // }, []);

  // ws.current.on("updateOrder", () => {
  //   console.log("my brother in christ the order is updating");
  // });

  const submitName = (event: any) => {
    event.preventDefault();
    const name = event.target[0].value;
    console.log("NAME", name);
    setName(name);
  };

  const [body, setBody] = useState(
    <div>
      Please enter your name:
      <form onSubmit={submitName}>
        <TextField
          type="text"
          name="name"
          label="Name"
          variant="standard"
          placeholder="(max 15 characters)"
        ></TextField>
        <Button type="submit">Confirm</Button>
      </form>
    </div>
  );

  console.log("users in landing", users);

  return (
    <div>
      {landingHeader}
      {body}
      <UserList users={users} />
    </div>
  );
}
