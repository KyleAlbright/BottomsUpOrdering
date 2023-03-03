import React from "react";
import {makeStyles} from '@material-ui/styles'

const useStyles =  makeStyles({
        footer: {
            backgroundColor: "grey",
            color: "white",
            width:"100%",
            textAlign: "center",
            padding: "1rem",
            position: "sticky",
            bottom: "0"
        }
    
});

export default function Footer(){

    const classes = useStyles();

    return <footer className={classes.footer}>@ 2023 Bottom's Up || All rights reserved.</footer>
}
