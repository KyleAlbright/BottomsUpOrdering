import { FormControl, FormGroup, InputLabel, Input, Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle=makeStyles({
    formStyle: {
        width: "50%",
        margin: 'auto',
        padding: 20,
        paddingTop: 20,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    },
    myBtn: {
        marginTop: 10,
        width: "10%",
    },
    header: {
    textAlign: "center"
    }
});

export default function Contact() {
    const classes = useStyle();
    return (
        <div>
            <h1 className={classes.header}>Contact Form</h1>
            <FormGroup className={classes.formStyle}>
                <FormControl>
                    <InputLabel>Full Name</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>Message</InputLabel>
                    <Input />
                </FormControl>
                <Button variant="contained" color="secondary" className={classes.myBtn}>
                    Send
                </Button>
            </FormGroup>
        </div>
    );
}