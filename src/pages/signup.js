import React, { useState} from "react";
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
import CancelIcon from '@material-ui/icons/Cancel'
import './login.css'

//actions
import {useDispatch,useSelector} from 'react-redux'
import {register,loadingScreen} from '../actions/user'

const Signup = () => {
  //initialize dispatch
  const dispatch=useDispatch()


  const [isOperator, setIsOperator] = useState(false);
  const [user,setUser]=useState({
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
  const userState=useSelector((state)=>state.user)

  //for check
  // userState.errormsg?console.log('error occurred : ',userState.errormsg):console.log('Current user : ',userState)

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "10px 0", backgroundColor: "#1bbd7e" };

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
        dispatch(loadingScreen(true))

        dispatch(register(user))


      }
      else
      {
        //for check
        console.log(futsal)

        dispatch(register(futsal))

      }

    }
    
    else
    {
      console.log('Please accept Terms and Conditions to signup')
    }

  }

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
          {isOperator && <TextField fullWidth label="Futsal Name" value={futsal.name} name='name' autoComplete='name' onChange={handleChange}/>}
          {isOperator && <TextField fullWidth label="Location" value={futsal.location} name='location' autoComplete='location' onChange={handleChange}/>}
          {isOperator && <TextField fullWidth label="Operator Name" value={futsal.operator_name} name='operator_name' autoComplete='operator_name' onChange={handleChange}/>}
          {!isOperator && <TextField fullWidth label="Name" value={user.name} name='name' autoComplete='name' onChange={handleChange}/>}
          {isOperator?<TextField fullWidth label="Email" value={futsal.email} name='email' autoComplete='email' onChange={handleChange}/>:<TextField fullWidth label="Email" value={user.email} name='email' autoComplete='email' onChange={handleChange}/>}
          {isOperator?<TextField fullWidth label="Phone Number" value={futsal.phone} name='phone' autoComplete='phone' onChange={handleChange}/>:<TextField fullWidth label="Phone Number" value={user.phone} name='phone' autoComplete='phone' onChange={handleChange}/>}
          {isOperator?<TextField fullWidth label="Username" value={futsal.username} name='username' autoComplete='username' onChange={handleChange}/>:<TextField fullWidth label="Username" value={user.username} name='username' autoComplete='username' onChange={handleChange}/>}
          {isOperator?<TextField type="password" fullWidth label="Password" value={futsal.password} name='password' autoComplete='password' onChange={handleChange}/>:<TextField type="password" fullWidth label="Password" value={user.password} name='password' autoComplete='password' onChange={handleChange}/>}
          {isOperator?<TextField type="password" fullWidth label="Confirm Password" value={futsal.confirm_password} name='confirm_password' autoComplete='confirmPassword' onChange={handleChange}/>:<TextField type="password" fullWidth label="Confirm Password" value={user.confirm_password} name='confirm_password' autoComplete='confirmPassword' onChange={handleChange}/>}
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


         {/*registration notifications*/}
         <Dialog
                open={userState.loading}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Registering ...
          </DialogContentText>
                </DialogContent>
              </Dialog>
              <Dialog
                open={userState.failed}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {userState.errormsg}
          </DialogContentText>
                  <Button onClick={() => dispatch(loadingScreen(false))}>
                    <CancelIcon />
                  </Button>
                </DialogContent>
              </Dialog>
              <Dialog
                open={userState.success}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Registration Successful
          </DialogContentText>
                  <Button link href="/login">
                    Proceed To Login

          </Button>
                </DialogContent>
              </Dialog>

      </Paper>
    </Grid>
  );
};

export default Signup;
