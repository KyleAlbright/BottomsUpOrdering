// importing everything we need

import React, { useState } from "react";
import { Paper, Typography, Tabs, Tab, Box } from "@material-ui/core";
import Signup from "./Signup";
import Login from "./SignIn";

// setting up our hooks and event handler for our component
const LogAndSign = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // custom stylings
  const paperStyle = { width: 340, margin: "20px auto" };
  // function to render a tab panel
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tabpanel-${index}`}
        {...other}
      >
        {/* render the children */}
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  // render our component
  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Paper>
  );
};
export default LogAndSign;
