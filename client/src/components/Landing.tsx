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

  const [landingHeader, setLandingHeader] = useState<any>();

  const { restaurant, setRestaurant } = useContext(restaurantContext);

  const { table, setTable } = useContext(tableContext);

  const [body, setBody] = useState(
    <div>
      Please enter your name:
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const name = event.target[0].value;
          console.log("NAME", name);
          setName(name);
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
    </div>
  );

  useEffect(() => {
    setRestaurant(searchParms.get("id1"));
    setTable(searchParms.get("id2"));
  }, []);

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3001/api/restaurant/${restaurant}/landing}`)
    //   .get("")
    //   .then((res) => {
    // DO SOMETHING TO RESPONSE HERE
    //   setLandingHeader(
    //     <div>
    //       <h1>WELCOME TO</h1>
    //       <span>RED</span>
    //       <span>BLOSSOM</span>
    //       <h5>You are seated at table {table}</h5>
    //     </div>
    //   );
    // });
    setLandingHeader(
      <div>
        <h1>WELCOME TO</h1>
        <span>RED</span>
        <span> BLOSSOM</span>
        <h5>You are seated at table {table}</h5>
      </div>
    );
  }, [table, restaurant]);

  useEffect(() => {
    if (user) {
      setBody(
        <div>
          Hello {user}
          <UserList users={users} />
        </div>
      );
    }
  }, [user]);

  return (
    <div>
      {landingHeader}
      {body}
      {/* <UserList users={users} /> */}
    </div>
  );
}
