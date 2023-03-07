import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormGroup,
  FormControl,
  Input,
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';
import Logo from "../assets/logo4.png";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

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

  const [email, setFromEmail] = useState('');
  const [password, setFromPassword] = useState('');
 
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const[loginUser, {error}] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      Auth.login(data.login.token);

    } catch (err) {
        console.log(err);
        setShowAlert(true);
    }

    setFromEmail('');
    setFromPassword('');

  };
  
  return (
    <Grid>
      <Paper  style={paperStyle}>
        <Grid align="center">
          <Avatar src={Logo} ></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <FormGroup noValidate validated={validated} onSubmit={handleFormSubmit}>
         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials! </Alert>

          <FormControl           
            type = "text"
            name = 'Email'
            fullWidth
            required>
            <Input placeholder="Enter Email" onChange={(event) => setFromEmail(event.target.value)} />
          </FormControl>

          <FormControl
            name="Password"
            type="password"
            fullWidth
            required>
            <Input placeholder="Enter Password" onChange={(event) => setFromPassword(event.target.value)}/>
          </FormControl>

          <Button 
          disabled={!(email && password)} 
          type="submit" 
          color="primary" 
          variant="contained" 
          style={btnStyle} 
          fullWidth
          onClick={handleFormSubmit}>
            Sign In
          </Button>
        </FormGroup>
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