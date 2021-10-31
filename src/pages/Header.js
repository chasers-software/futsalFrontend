import React from "react";
import AppBar from "@mui/material/AppBar";
import { Typography, Button, Box, Toolbar, CssBaseline } from "@mui/material";
import logo from "../images/Capture.PNG";
// import MenuIcon from '@mui/icons-material/Menu';
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "#123524" }}>
          <Toolbar>
            <img src={logo} height="inherit" alt="logo" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Futsal Nepal
            </Typography>
            <Button component={Link} to="/login" color="inherit">
              Log In
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
