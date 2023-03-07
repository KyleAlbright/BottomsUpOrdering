import React from 'react';
import { motion } from 'framer-motion';
import { makeStyles, TextField, Button, TextareaAutosize } from '@material-ui/core';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const useStyles = makeStyles(() => ({
  loginscreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '30vh',
    textAlign: 'center',
    margin: '160px',
  },
  text: {
    width: '400px',
    height: '5rem',
    lineHeight: '1.6em',
  },
  btnLogin: {
    lineHeight: '2.55rem',
    letterSpacing: '1em',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#3F51B5',
    backgroundColor: '#3848AA',
    marginTop: '15px',
  },
  btnText: {
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();

  const onHandleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_rfe2vim', 'template_r1l66kl', e.target, 'M8aO5_Npmhdub5SrD')
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            icon: 'success',
            title: 'Success! Message sent.',
          });
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            icon: 'error',
            title: 'Error! Try again.',
            text: error.text,
          });
        }
      );
    e.target.reset();
  };

  // Define the animation variants
  const containerVariants = {
    hidden: { opacity: 0, rotate: '-180deg' },
    visible: { opacity: 1, rotate: '0deg', transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        className={classes.loginscreen}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={onHandleSubmit}>
          <div>
            <h2>Contact Form</h2>
            <TextField fullWidth className={classes.text} type="text" label="Name" required name="user_name" />
          </div>

          <div>
            <TextField className={classes.text} type="email" label="Email" name="user_email" required />
          </div>

          <div>
            <TextareaAutosize
              className={classes.text}
              type="text"
              label="Message"
              required
              name="message"
              variant="outlined"
              placeholder="Fill out your message here and click submit!"
              style={{
                width: 400,
                height: 100,
                borderColor: '#909090',
                borderWidth: 1.3,
                marginBottom: '10px',
              }}
            />
          </div>

          <div className={classes.btnLogin}>
            <Button type="submit" className={classes.btnText}>
              SUBMIT
            </Button>
          </div>
        </form>
      </motion.div>
    </>
  );
}

export default App;