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
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";

export default function EmployeeMenuItems() {
  const [menu, setMenu] = useState([]);

  const price = function (price: number) {
    return (price / 100).toFixed(2);
  };

  useEffect(() => {
    axios
      // .get(`/api/menu?id=${localStorage.getItem("restaurant")}`)
      .get(
        `http://localhost:3001/api/menu?id=${localStorage.getItem(
          "restaurant"
        )}`
      )
      .then((res) => {
        setMenu(res.data);
        console.log("menu: ", menu);
        console.log("Result: ", res);
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{ width: "50vw", maxWidth: 700, minWidth: 500, px: 2, py: 1 }}
        component={Paper}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box>
            <CircleIcon fontSize="small" sx={{ mr: 2 }} />
            <span className="mont header">Menu</span>
          </Box>
          <AddMenuItem />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(menu) &&
              menu.map((row: any) => (
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
                  <TableCell align="center">
                    ${(row.price / 100).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <DeleteMenuItem
                      setMenu={setMenu}
                      id={row._id}
                      name={row.name}
                      image_url={row.image_url}
                    />
                  </TableCell>
                </TableRow>
              ))}
            {menu.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row">
                  No menu items
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
