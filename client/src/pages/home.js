// importing everything we need

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import heroVideo from "../assets/HeroVideo.mp4";

// setting up some styling
const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    width: "100%",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(4),
    },
    fontFamily: "Arial Black, sans-serif",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    textShadow: "3px 3px #fff", // 
    color: "#FFD15B",
    fontSize: "5rem",
  },
}));

// rendering our component
const Hero = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ReactPlayer
        url={heroVideo}
        playing
        loop
        muted
        width="100%"
        height="100%"
      />
      <div className={classes.overlay}>
        <Box color="#fff" textAlign="center">
          <Typography variant="h3" component="h1" className={classes.title}>
            Bottoms-Up Ordering
          </Typography>
        </Box>
      </div>
    </section>
  );
};

export default Hero;