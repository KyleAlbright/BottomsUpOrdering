import { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Modal,
  SwipeableDrawer,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import Logo from "../assets/logo4.png";
import MenuIcon from "@material-ui/icons/Menu";
import Login from "./LogAndSign";
import Auth from '../utils/auth';
const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: "#6B4D2F",
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  link: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2),
    textDecoration: 'none', 
    "&:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  button: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    width: 250,
  },
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
  },
  grow: {
    flexGrow: 1,
  },
  navLinkContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
}));
export default function Header() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const handleLoginClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleLogout = () => {
    Auth.logout();
    window.location.reload();
  };
  let navigationLinks = [];
  if (Auth.loggedIn()) {
    navigationLinks = [
      { name: "Products", href: "/products" },
      { name: "View Cart", href: "shoppingcart" },
      { name: "Contact Us", href: "contact" },
    ];
  } else {
    navigationLinks = [
      { name: "Contact Us", href: "contact" },
      { name: "Login", href: "login" },
    ];
  }
  const drawer = (
    <div className={styles.drawer}>
      <List>
        {navigationLinks
          .filter((item) => item.name !== "Login")
          .map((item) => (
            <ListItem
              button
              key={item.name}
              component={Link}
              to={item.path}
              onClick={handleDrawerClose}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
      </List>
    </div>
  );
  return (
    <>
      <Modal
        className={styles.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <div className={styles.paper}>
          <h2 id="login-modal-title">Login</h2>
          <p id="login-modal-description">
            <Login />
          </p>
        </div>
      </Modal>
      <AppBar position="sticky" className={styles.navBar}>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={styles.button}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
            >
              {drawer}
            </SwipeableDrawer>
            <div style={{ flexGrow: 1 }} />

            <a href="/">
            <Avatar alt="Bottoms-Up-Logo" src={Logo} href="/" />
            </a>
            
            {navigationLinks.map((item) =>
              item.name === "Login" ? (
                <Button
                  variant="contained"
                  color=""
                  onClick={handleLoginClick}
                  key={item.name}
                >
                  {item.name}
                </Button>
              ) : (
                <Link
                  className={styles.link}
                  variant="button"
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </Link>
              )
            )}
            {Auth.loggedIn() && (
              <Button
                variant="contained"
                color=""
                onClick={handleLogout}
                key="logout"
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}