import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { List, Typography } from "@mui/material";
import EditMenuItem from "./EditMenuItem";
import DeleteMenuItem from "./DeleteMenuItem";
import AddMenuItem from "./AddMenuItem";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

function createData(
  image: string,
  name: string,
  category: string,
  price: string
) {
  return { image, name, category, price };
}

const rows = [
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "miso soup",
    "soup",
    "3.99"
  ),
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "tuna rolls",
    "rolls",
    "14.99"
  ),
  createData(
    "https://www.pressurecookrecipes.com/wp-content/uploads/2021/05/miso-soup.jpg",
    "salmon handroll",
    "handroll",
    "9.99"
  ),
];

export default function EmployeeMenuItems() {
  const [menu, setMenu] = useState({});

  useEffect(() => {
    // axios
    // .get(
    //   `http://localhost:3001/api/menu?id=${localStorage.getItem(
    //     "restaurant"
    //   )}`
    // )
    axios
      .get(`http://localhost:3001/api/menu?id=6283f1d9804b848eb5e4560c`)
      .then((res) => {
        setMenu(res.data);
        console.log("menu: ", menu);
        console.log("Result: ", res);
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return (
    <>
      <Typography variant="body1">Menu</Typography>
      <Typography variant="body1" align="right">
        <AddMenuItem />
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={row.image_url}
                    width={100}
                    height={100}
                    alt="food"
                  />
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">${row.price}</TableCell>
                <TableCell align="center">
                  <EditMenuItem />
                  <DeleteMenuItem />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
