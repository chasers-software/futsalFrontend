import React,{useState, useEffect} from "react";
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
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notification";


//actions
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../actions/userActions";



const Login = ({history,location}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch()
  
  const userLogin = useSelector(state => state.userLogin)
  
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username,password))
  }
  //initialise dispatch


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
    <>
    <Header />
    <Grid className='logInPage'>
        {error &&<Notification severity='error' message={error} />}
        {loading && <Notification severity='info' message='Logging you in...' />}
        {userInfo && <Notification severity='success' message='You are successfully Logged in'></Notification>}
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} />
            <h2>Log In</h2>
        </Grid>
          <TextField label="Username" value={ username } onChange={(e)=>setUsername(e.target.value)} fullWidth required />
          <TextField label="Password" value={ password } onChange={(e)=>setPassword(e.target.value)} type="password" fullWidth required />
          <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={submitHandler}  
          fullWidth
        >
          Log in
        </Button>
        <Typography>
          <Link component={RouterLink} to="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
            Do you have an account ?<Link component={RouterLink} to={redirect ?`signup?redirect=${redirect}` :  "/signup"}>Sign Up</Link>
        </Typography>
      </Paper>
      </Grid>
      <Footer />
      
      </>
  );
};

export default Login;
