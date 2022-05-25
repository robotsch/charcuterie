import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";

// src: https://github.com/mui/material-ui/tree/v5.8.1/docs/data/material/getting-started/templates/sign-in
// MUI to the rescue! Sure employee login styling wasn't MVP, but...

const theme = createTheme({
  palette: {
    primary: {
      main: "#242F36", // charcoal grey complement
    },
  },
});
export default function SignIn() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uname = data.get("username");
    const pw = data.get("password");
    axios.post("/api/employee-login", { username: uname, password: pw })
    // axios
      // .post("http://localhost:3001/api/employee-login", {
      //   username: uname,
      //   password: pw,
      //   withCredentials: true,
      // })
      .then((res) => {
        localStorage.setItem("restaurant", res.data)
        window.location.reload();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid p={10}>
            <img
              src="https://cdn.discordapp.com/attachments/856696248111595541/978644697213980722/logo.png"
              alt="Charcuterie"
            />
          </Grid>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
