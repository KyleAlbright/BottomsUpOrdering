import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormGroup
} from "@material-ui/core";

import Logo from "../assets/logo4.png";
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/react-hooks'
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

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

  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar src={Logo}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <FormGroup noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials! </Alert>
        <TextField
          type = "text"
          name="Username"
          placeholder="Enter Username"
          onChange={handleInputChange}
          value={userFormData.username}
          fullWidth
          required
        />
        <TextField
         type = "text"
         name="Email" 
         placeholder="Enter Email"
         onChange={handleInputChange}
         value={userFormData.email} 
         fullWidth 
         required />
        
        <TextField
          name="Password"
          placeholder="Enter Password"
          type="password"
          onChange={handleInputChange}
          value={userFormData.password}
          fullWidth
          required
        />

        <Button
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          fullWidth
        >
          Create Account
        </Button>
        </FormGroup>
        <Typography>
          {" "}
          Already have an account?
          <Link href="login">&nbsp;Login here</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
