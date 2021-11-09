import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText 

} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import './login.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
//actions
import {useDispatch,useSelector} from 'react-redux'
import { registerUser } from '../actions/userActions'
import { registerFutsal } from "../actions/futsalActions";

const Signup = ({history}) => {
  //initialize dispatch
  const dispatch=useDispatch()
  const [isOperator, setIsOperator] = useState(false);
  
  const [user, setUser] = useState({
    name:'',
    email:'',
    phone:'',
    username:'',
    password:'',
    confirm_password:'',
    role:'player'
  })
  const [futsal,setFutsal]=useState({
    name:'',
    location:'',
    operator_name:'',
    email:'',
    phone:'',
    username:'',
    password:'',
    confirm_password:'',
    role:'operator'

  })
  const [acceptTerms,isAcceptTerms]=useState(false)
  const { userLoading, userInfo, usertoken, userError } = useSelector((state) => state.userRegister)
  const { futsalLoading, operatorInfo, futsalInfo, futsaltoken, futsalError } = useSelector((state) => state.futsalRegister)

  useEffect(() => {    
    if (userInfo || futsalInfo) 
    {
      history.push('/login')
    }
  }, [history, userInfo, futsalInfo])

  
  const switchSignupType = () => {
    setIsOperator(!isOperator);
  };
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    isOperator?setFutsal({...futsal,[name]:value}):setUser({ ...user, [name]: value });
  };

  const handleSubmit=(e)=>
  {
    e.preventDefault();
    
    if(acceptTerms)
    {
      if(!isOperator)
      {
        //for check
        console.log(user)
        if (user.password.length < 6) {
          alert('password length cannot be less than 6')
        }
        else {
          if (user.password === user.confirm_password) {
            dispatch(registerUser(user))
          }
          else {
            alert("passwords do not match")
          }
        }  
      }
      else
      {
        //for check
        console.log(futsal)
        if (futsal.password.length < 6) {
          alert('password length cannot be less than 6')
        }
        else {
          if (futsal.password === futsal.confirm_password) {
            dispatch(registerFutsal(futsal))
          }
          else {
            alert("passwords do not match")
          }
        }
      }
    }
    
    else
    {
      console.log('Please accept Terms and Conditions to signup')
    }
    
 
  }
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "10px 0", backgroundColor: "#1bbd7e" };
  
  return (
    <>
    <Header />
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
          {isOperator && <TextField fullWidth label="Futsal Name" value={futsal.name} name='name' autoComplete='name' onChange={handleChange}/>}
          {isOperator && <TextField fullWidth label="Location" value={futsal.location} name='location' autoComplete='location' onChange={handleChange}/>}
          {isOperator && <TextField fullWidth label="Operator Name" value={futsal.operator_name} name='operator_name' autoComplete='operator_name' onChange={handleChange}/>}
          {!isOperator && <TextField fullWidth label="Name" value={user.name} name='name' autoComplete='name' onChange={handleChange}/>}
          {isOperator ? <TextField fullWidth label="Email" type="email" value={futsal.email} name='email' autoComplete='email' onChange={handleChange} /> :
            <TextField fullWidth label="Email" value={user.email} type="email" name='email' autoComplete='email' onChange={handleChange} />}
          {isOperator ? <TextField fullWidth label="Phone Number" value={futsal.phone} name='phone' autoComplete='phone' onChange={handleChange} /> :
            <TextField fullWidth label="Phone Number" value={user.phone} name='phone' autoComplete='phone' onChange={handleChange} />}
          {isOperator ? <TextField fullWidth label="Username" value={futsal.username} name='username' autoComplete='username' onChange={handleChange} /> :
            <TextField fullWidth label="Username" value={user.username} name='username' autoComplete='username' onChange={handleChange} />}
          {isOperator ? <TextField type="password" fullWidth label="Password" value={futsal.password} name='password' autoComplete='password' onChange={handleChange} /> :
            <TextField type="password" fullWidth label="Password" value={user.password} name='password' autoComplete='password' onChange={handleChange} />}
          {isOperator?<TextField type="password" fullWidth label="Confirm Password" value={futsal.confirm_password} name='confirm_password' autoComplete='confirmPassword' onChange={handleChange}/>:
          <TextField type="password" fullWidth label="Confirm Password" value={user.confirm_password} name='confirm_password' autoComplete='confirmPassword' onChange={handleChange}/>}
          
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
            onClick={()=>isAcceptTerms(!acceptTerms)}
            checked={acceptTerms}
          />
          <Button
              type="submit"
            variant="contained"
            color="primary"
            style={btnstyle}
            onClick={handleSubmit}
          >
            Sign up
          </Button>

        </form>
        
      </Paper>
      </Grid>
      <Footer/>
    </>
  );
};

export default Signup;
