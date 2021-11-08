import React from "react";
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import './login.css'

//actions
import {useDispatch} from 'react-redux'



const Login = () => {
  //initialise dispatch
  const dispatch=useDispatch()


  //some styling
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0", backgroundColor: "#1bbd7e" };


  

  return (
    <Grid className='logInPage'>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} />
          <h2>Log In</h2>
        </Grid>
        <TextField label="Username" fullWidth required />
        <TextField label="Password" type="password" fullWidth required />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Log in
        </Button>
        <Typography>
          <Link component={RouterLink} to="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link component={RouterLink} to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;