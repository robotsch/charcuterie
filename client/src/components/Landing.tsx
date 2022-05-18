import { TextField, Button } from "@mui/material";
import resolveProps from "@mui/utils/resolveProps";
import axios from "axios";
import { useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function Landing() {
  axios.defaults.withCredentials = true;
  const ws = useRef<null | any>(null);

  useEffect(() => {}, []);

  const join = () => {
    ws.current = io("http://localhost:3001", { query: { data: "test" } });
    ws.current.emit("join", { restaurant: 1, table: 1, name: "test" });
    return () => {
      ws.current.disconnect();
    };
  };

  const submitName = (event: any) => {
    event.preventDefault();
    const name = event.target[0].value;
    console.log("NAME", name);

    axios
      .get("http://localhost:3001/api/landing?id1=1&id2=2")
      .then((res) => {
        console.log(res);

        axios
          .post("http://localhost:3001/api/name-input", { name })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log("SESSION", error));
      })
      .catch((error) => console.log("RESTARUATN", error));

    // .catch((res) => console.log("error", res));
  };

  // const onLoad = () => {
  //   axios.get("http://localhost:3001/api/landing").then((res) => {console.log(RESTUARNT ID + SESSION)});
  // };

  return (
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
        <Button type="submit" onClick={join}>
          Confirm
        </Button>
      </form>
    </div>
  );
}
