import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,


} from "@material-ui/core";
import Logo from "../assets/logo4.png"

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "55vh",
    width: 300,
    margin: "0 auto",
  };

  const btnStyle = {
    margin: "8px 0"
  };
  return (
    <Grid>
      <Paper  style={paperStyle}>
        <Grid align="center">
          <Avatar src={Logo} ></Avatar>
          <h2>Sign In</h2>
        </Grid>

        <TextField
          label="Username"
          placeholder="Enter Username"
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
        />

        <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
          Sign In
        </Button>
        <Typography> Do you have an account?
          <Link href="#" >
          &nbsp;Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
