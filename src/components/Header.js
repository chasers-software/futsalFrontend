import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import { Typography, Button, Box, Toolbar, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from "../images/Capture.PNG";
// import MenuIcon from '@mui/icons-material/Menu';
import "./Header.css";
import { Link } from "react-router-dom";
import { logout } from '../actions/userActions'




const Header = () => {
  const dispatch = useDispatch()
//For dropdown menu on Login
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

//user information received from state
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

//logout handler
  const handleLogout = () => {
    dispatch(logout())
  }

//render this jsx
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "#123524" }}>
          <Toolbar>
            <img src={logo} height="inherit" alt="logo" />
            <Typography variant="h6" component={Link} to='/' sx={{ flexGrow: 1 }} style={{color:'white', textDecoration:'none'}}>
              Futsal Nepal
            </Typography>
            {userInfo ? 
              <>
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{color:'white'}}
                >
                  <AccountCircleIcon style={{paddingRight:'3px'}} /> {userInfo.user?.name}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
              :
              <>
                <Button component={Link} to="/login" style={{color:'white'}}>
                  Log In
                </Button>
                <Button component={Link} to="/signup" style={{color:'white'}}>
                  Sign Up
                </Button>
              </>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
