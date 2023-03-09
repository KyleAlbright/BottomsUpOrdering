// import everything we need

import React from "react";
import { makeStyles } from "@material-ui/styles";

// our custom styles
const useStyles = makeStyles({
  footer: {
    backgroundColor: "#6B4D2F",
    color: "white",
    width: "100%",
    textAlign: "center",
    padding: "1rem",
    position: "fixed",
    bottom: "0",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
});

// setting up our component
export default function Footer() {
  const classes = useStyles();

  // rendering our component
  return (
    <footer className={classes.footer}>
      @ 2023 Bottom's Up || All rights reserved. || Looking for inventory
      management?
      <a
        href="https://bottoms-up-2023-app.herokuapp.com/"
        className={classes.link}
      >
        {" "}
        &nbsp;CLICK HERE
      </a>
    </footer>
  );
}
