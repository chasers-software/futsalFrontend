import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import './login.css'

const Signup = () => {
  const [isOperator, setIsOperator] = useState(false);

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "10px 0", backgroundColor: "#1bbd7e" };

  const switchSignupType = () => {
    setIsOperator(!isOperator);
  };

  return (
    <Grid className='signUpPage'>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} />
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to{" "}
            {!isOperator ? "create an account !" : "register your futsal !"}
          </Typography>
        </Grid>
        <Button
          onClick={switchSignupType}
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          {isOperator ? "Register User Instead" : "Register Futsal Instead"}
        </Button>

        <form>
          {isOperator && <TextField fullWidth label="Futsal Name" />}
          {isOperator && <TextField fullWidth label="Location" />}
          {isOperator && <TextField fullWidth label="Operator Name" />}
          {!isOperator && <TextField fullWidth label="Name" />}
          <TextField fullWidth label="Email" />
          <TextField fullWidth label="Phone Number" />
          <TextField fullWidth label="Username" />
          <TextField type="password" fullWidth label="Password" />
          <TextField type="password" fullWidth label="Confirm Password" />
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={btnstyle}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
