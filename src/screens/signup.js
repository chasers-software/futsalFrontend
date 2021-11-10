import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import './login.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
//actions
import {useDispatch,useSelector} from 'react-redux'
import { registerUser } from '../actions/userActions'
//import { registerFutsal } from "../actions/futsalActions";

const Signup = ({history, location}) => {
  //initialize dispatch
  const dispatch = useDispatch()
  
  //message to show in notification in case of some validation error
  const [message, setMessage] = useState(null)

  const [isOperator, setIsOperator] = useState(false);

  //for form validation
  const [userError, setUserError] = useState({
    nameError: '',
    emailError: '',
    phoneError: '',
    usernameError: '',
    passwordError: '',
    confirm_passwordError:''
  })

   const [futsalError, setFutsalError] = useState({
    nameError: '',
    emailError: '',
    phoneError: '',
    usernameError: '',
    passwordError: '',
    confirm_passwordError: '',
    locationError: '',
    operator_nameError: ''
  })
  
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
  const { loading, userInfo, error } = useSelector((state) => state.userRegister)


  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {    
    if (userInfo) 
    { 
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  
  const switchSignupType = () => {
    setIsOperator(!isOperator);
  };
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    isOperator?setFutsal({...futsal,[name]:value}):setUser({ ...user, [name]: value });
  };


  const validate = () => {
    let isError = false
    
    if (!acceptTerms) {
      isError=true
      setMessage('Please Accept term and conditions')
    }
    else {
      setMessage('')
    }

    if (!isOperator) {
      const tempUserError = {
      nameError: '',
      emailError: '',
      phoneError: '',
      usernameError: '',
      passwordError: '',
      confirm_passwordError:''
      }
      if (user.name === '') {
        isError=true
        tempUserError.nameError='Name Cannot be empty'
        
      }
      if (user.email.indexOf("@") === -1) {
        isError = true
        tempUserError.emailError='Email Should contain @'
      }
        if (user.username === '') {
        isError = true
        tempUserError.usernameError='Username cannot be empty'
      }
      if (user.password.length < 6) {
        isError = true
        tempUserError.passwordError='Password should contain at least 6 characters'
      }
      if (user.password !== user.confirm_password) {
        isError = true
        tempUserError.confirm_passwordError= 'Password doesn\'t Match' 
      }
      if (user.phone.length < 10 ) {
        isError = true
        tempUserError.phoneError='Phone number should be of at least 10 digits'
      }
      setUserError({
        ...userError,
        ...tempUserError
      })
      
    }
    else {
      const tempFutsalError = {
      nameError: '',
      emailError: '',
      phoneError: '',
      usernameError: '',
      passwordError: '',
      confirm_passwordError: '',
      locationError: '',
      operator_nameError: ''
      }
      if (futsal.name === '') {
        isError=true
        tempFutsalError.nameError='Name Cannot be empty'
      }
      if (futsal.location === '') {
        isError = true
        tempFutsalError.locationError='Location cannot be empty'
      }
      if (futsal.operator_name === '') {
        isError = true
        tempFutsalError.operator_nameError='Operator name cannot be empty'
      }
      if (futsal.email.indexOf("@") === -1) {
        isError = true
        tempFutsalError.emailError='Email Should contain @'
      }
      if (futsal.username === '') {
        isError = true
        tempFutsalError.usernameError='Username cannot be empty'
      }
      if (futsal.password.length < 6) {
        isError = true
        tempFutsalError.passwordError='Password should contain at least 6 characters'
      }
      if (futsal.password !== futsal.confirm_password) {
        isError = true
        tempFutsalError.confirm_passwordError= 'Password doesn\'t Match' 
      }
      if (futsal.phone.length < 10 ) {
        isError = true
        tempFutsalError.phoneError='Phone number should be of 10 digits'
      }
      setFutsalError({
        ...futsalError,
        ...tempFutsalError
      })
      
    }

    return !isError
  }

  const handleSubmit=(e)=>
  {
    e.preventDefault();

    const isValidated = validate()
    
      if(!isOperator)
      {
        if (isValidated) {
          dispatch(registerUser(user))
        }
      }  
      else
      {
        //for check
        if (isValidated) {
          dispatch(registerUser(futsal))
        }
      }
    
  }

  const renderNotification = () => {
      if (loading) {
        return <Notification severity='info' message='Logging you in...' />
      }
      else if (userInfo) {
        return <Notification severity='success' message='Successfully Registered'/>
      }
      else if (error) {
        return <Notification severity='error' message={error} />
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
      {renderNotification()}
      {message && <Notification severity='error' message={message} /> }
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
          {isOperator &&
            <TextField
              variant='standard'
              fullWidth
              label="Futsal Name"
              value={futsal.name} name='name'
              autoComplete='name'
              error={Boolean(futsalError.nameError)}
              helperText={futsalError.nameError}
              onChange={handleChange} />}
          {isOperator && 
            <TextField
              variant='standard' 
              fullWidth 
              label="Location" 
              value={futsal.location} 
              name='location' 
              autoComplete='location'
              error={Boolean(futsalError.locationError)}
              helperText={futsalError.locationError}
              onChange={handleChange}
            />}
          {isOperator && 
            <TextField 
              variant='standard' 
              fullWidth 
              label="Operator Name" 
              value={futsal.operator_name} 
              name='operator_name'
              autoComplete='operator_name'
              error={Boolean(futsalError.operator_nameError)}
              helperText={futsalError.operator_nameError}
              onChange={handleChange}
            />}
          {!isOperator && 
            <TextField 
              variant='standard' 
              fullWidth label="Name" 
              value={user.name} 
              name='name' 
              autoComplete='name'
              error={Boolean(userError.nameError)}
              helperText={userError.nameError}
              onChange={handleChange}
            />}
          {isOperator ? 
            <TextField 
              variant='standard' 
              fullWidth label="Email" 
              type="email" 
              value={futsal.email} 
              name='email' 
                autoComplete='email'
                error={Boolean(futsalError.emailError)}
              helperText={futsalError.emailError}
              onChange={handleChange}
            /> :
            <TextField 
              variant='standard' 
              fullWidth 
              label="Email" 
              value={user.email} 
              type="email" 
              name='email' 
                autoComplete='email'
                error={Boolean(userError.emailError)}
              helperText={userError.emailError}
              onChange={handleChange}
            />
          }
          {isOperator ?
            <TextField 
                variant='standard'
                type='number'
              fullWidth 
              label="Phone Number" 
              value={futsal.phone}
              name='phone' 
                autoComplete='phone'
                error={Boolean(futsalError.phoneError)}
              helperText={futsalError.phoneError}
              onChange={handleChange}
            />
              :
            <TextField
                variant='standard'
                type='number'
              fullWidth 
              label="Phone Number" 
              value={user.phone} 
              name='phone' 
                autoComplete='phone'
                error={Boolean(userError.phoneError)}
              helperText={userError.phoneError}
              onChange={handleChange}
            />
          }
          {isOperator ? 
            <TextField 
              variant='standard' 
              fullWidth 
              label="Username" 
              value={futsal.username} 
              name='username' 
                autoComplete='username'
                error={Boolean(futsalError.usernameError)}
              helperText={futsalError.usernameError}
              onChange={handleChange}
            /> :
            <TextField 
              variant='standard' 
              fullWidth 
              label="Username" 
              value={user.username} 
              name='username' 
                autoComplete='username'
                error={Boolean(userError.usernameError)}
              helperText={userError.usernameError}
               onChange={handleChange}
            />}
          {isOperator ? 
              <TextField
                variant='standard'
                type="password"
                fullWidth label="Password"
                value={futsal.password}
                name='password'
                autoComplete='password'
                error={Boolean(futsalError.passwordError)}
              helperText={futsalError.passwordError}
                onChange={handleChange}
              /> :
            <TextField 
                variant='standard'
                type="password"
                fullWidth
                label="Password"
                value={user.password}
                name='password'
                autoComplete='password'
                error={Boolean(userError.passwordError)}
                helperText={userError.passwordError}
                onChange={handleChange}
            />
          }
          {isOperator?
            <TextField
                variant='standard'
                type="password"
                fullWidth
                label="Confirm Password"
                value={futsal.confirm_password}
                name='confirm_password'
                autoComplete='confirmPassword'
                error={Boolean(futsalError.confirm_passwordError)}
              helperText={futsalError.confirm_passwordError}
                onChange={handleChange}
          
            /> :
            <TextField 
                variant='standard'
                type="password"
                fullWidth label="Confirm Password"
                value={user.confirm_password}
                name='confirm_password'
                autoComplete='confirmPassword'
                error={Boolean(userError.confirm_passwordError)}
              helperText={userError.confirm_passwordError}
                onChange={handleChange}
            />
          }
          
          <FormControlLabel
              control={<Checkbox name="checkedA"/>}
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
      <Footer />
    </>
  );
};

export default Signup;
