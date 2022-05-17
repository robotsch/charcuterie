import { TextField, Button } from "@mui/material";
import resolveProps from "@mui/utils/resolveProps";
import axios from "axios";

export default function Landing() {
  const submitName = (event: any) => {
    event.preventDefault();
    const name = event.target[0].value;
    console.log("NAME", name);
    axios.defaults.withCredentials = true;
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
        <Button type="submit">Confirm</Button>
      </form>
    </div>
  );
}
