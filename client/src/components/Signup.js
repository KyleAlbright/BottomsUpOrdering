// importing everything we need

import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Button,
  FormGroup,
  FormControl,
  Input,
} from "@material-ui/core";

import Logo from "../assets/logo4.png";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

// setting up our component with some custom styling
const Signup = () => {
  const paperStyle = {
    padding: 20,
    height: "55vh",
    width: 300,
    margin: "0 auto",
  };

  const btnStyle = {
    margin: "8px 0",
  };

  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // using hook to add new user with our ADD_USER mutation hook
  const [addUser, { error, data }] = useMutation(ADD_USER);
  // preventing default submission behavior
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // prevent submission if invalid
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // calling the ADD_USER Mutation
    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });
      // if successful log in the new user or show alert if something went wrong
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    // reset values
    setUserName("");
    setPassword("");
    setEmail("");
  };
  // rendor our component
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar src={Logo}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <FormGroup noValidate validated={validated}>
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your login credentials!{" "}
          </Alert>

          <FormControl type="text" name="Username" fullWidth required>
            <Input
              placeholder="Enter Username"
              onChange={(event) => setUserName(event.target.value)}
            />
          </FormControl>

          <FormControl type="text" name="Email" fullWidth required>
            <Input
              placeholder="Enter Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>

          <FormControl name="Password" type="password" fullWidth required>
            <Input
              placeholder="Enter Password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </FormControl>

          <Button
            disabled={!(username && email && password)}
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
            onClick={handleFormSubmit}
          >
            Create Account
          </Button>
        </FormGroup>
      </Paper>
    </Grid>
  );
};

export default Signup;
