import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import {
  Avatar,
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Box
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FileBase from "react-file-base64";
import Notification from "../components/Notification";

import "./Profile.css";
import { userProfile,userProfileEdit } from "../actions/userActions";
import { futsalDetailEdit } from "../actions/futsalActions";
import ProfilePic from "../images/blank-profile-picture.png";

const Profile = () => {
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [editMode, setEditMode] = useState({ edit: false, component: "" });
  const [futsalDetails, setfutsalDetails] = useState({ futsalDescription: "",images:[] });
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [profilePic,setProfilePic]=useState('')


  const { loading, userDetail, error } = useSelector(
    (state) => state.userProfile
  );


  const futsalDetailEditState = useSelector((state) => state.futsalDetailEdit);
  const userProfileEditState=useSelector((state)=>state.userDetailEdit)

  useEffect(() => {
    dispatch(userProfile(userInfo));
  }, []);

  const handleEdit = () => {
    
    console.log(futsalDetails);
    dispatch(futsalDetailEdit(userInfo, futsalDetails));
    
  };

  const handleSubmit=()=>{
    console.log(name,email,phoneNumber,profilePic);
    const newProfileDetails={name,email,profilePic,phone:phoneNumber}

    dispatch(userProfileEdit(userInfo.user.userId,newProfileDetails,userInfo.token))
  }

  const handleFutsalDetailChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setfutsalDetails({ ...futsalDetails, [name]: value });
   
  };
  

  // //for checking
  // console.log('userInfo in localStorage',userInfo)

  // const {email,name,username,phone,role}=userDetail
  return (
    <>
      {loading ? (
        <CircularProgress
          sx={{ margin: "auto", position: "absolute", top: "48%", left: "48%" }}
        />
      ) : error ? (
        <>
          <Header />
          <Notification severity="error" message={error} />
          <div style={{ height: "100vh" }}>x </div>
        </>
      ) : (
        <>
          <Header />
          {editMode.edit ? (
            editMode.component === "futsalDetailAdd" ? (
              <>
                <Grid container sx={{ mt: "80px" }}>
                  <Grid item sx={{ my: "1rem", ml: "80px" }} sm={12}>
                    <Typography variant="h6">
                      Add Futsal Photos
                    </Typography>
                    <FileBase
                        type="file"
                        multiple={true}
                        onDone={(imag) =>{
                          const base64Pics=imag.map(image=>image.base64)
                          setfutsalDetails({...futsalDetails,images:base64Pics})}
                          
                        }
                      />
                  </Grid>
                  <Grid item sx={{ my: "1rem", ml: "80px" }} sm={12}>
                    <Typography variant="h6">Add Futsal Description</Typography>
                    <TextField
                      variant="outlined"
                      rows={4}
                      multiline
                      label="futsalDescription"
                      value={futsalDetails.futsalDescription}
                      name="futsalDescription"
                      onChange={handleFutsalDetailChange}
                      sx={{ width: "50ch" }}
                      placeholder={userDetail[1].description}
                    />
                  </Grid>
                </Grid>
                <Button color="inherit" onClick={() => handleEdit()}> Save</Button>
                <Button
                color="inherit"
                  href="/profile"
                >
                  Cancel
                </Button>
                {futsalDetailEditState.loading && <Notification severity="info" message='Saving futsalDetails...'/>}
                {futsalDetailEditState.success && <Notification severity="success" message='futsalDetails Saved'/>}
                {futsalDetailEditState.error && <Notification severity="error" message={futsalDetailEditState.error}/>}
              </>
            ) : (
              <>
              <Grid container sx={{ mt: "80px" }}>
                  <Grid item sx={{ my: "1rem", ml: "80px" }} sm={12}>
                    <Typography variant="h6">
                      Add New Profile Picture
                    </Typography>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) =>
                         setProfilePic(base64)
                          
                        }
                      />
                  </Grid>
                  <Grid item sx={{ my: "1rem", ml: "80px" }} sm={12}>
                    <Typography variant="h6">Name</Typography>
                    <TextField
                      variant="outlined"
                      label="name"
                      value={name}
                      name="name"
                      onChange={(e)=>setName(e.target.value)}
                      placeholder={userDetail[0].name}
                    />
                  </Grid>
                  <Grid item sx={{ my: "1rem", ml: "80px" }} sm={12}>
                    <Typography variant="h6">Email</Typography>
                    <TextField
                      variant="outlined"
                      label="email"
                      value={email}
                      name="email"
                      placeholder={userDetail[0].email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{ my: "1rem", ml: "80px" }} sm={12}>
                    <Typography variant="h6">Phone Number</Typography>
                    <TextField
                      variant="outlined"
                      label="Phone Number"
                      value={phoneNumber}
                      name="phone"
                      placeholder={userDetail[0].phone}
                      onChange={(e)=>setPhoneNumber(e.target.value)}

                      
                    />
                  </Grid>
                </Grid>
              
               
                <Button 
                 color="inherit" onClick={handleSubmit}  sx={{mt:'1rem',ml:'350px'}}> Save</Button>
                <Button
                color="inherit"
                  href="/profile" 
                  color="inherit"
                  sx={{mt:'1rem',ml:'100px'}}
                >
                  Cancel
                </Button>
                {userProfileEditState.loading && <Notification severity="info" message='Saving New Profile...'/>}
                {userProfileEditState.success && <Notification severity="success" message='New Profile Saved'/>}
                {userProfileEditState.error && <Notification severity="error" message={userProfileEditState.error}/>}
              </>
            )
          ) : (
            <>
              {userDetail &&
                (userDetail[1] ? (
                  <>
                    <Grid container sx={{ mt: "80px" }}>
                      <Grid item sx={{ my: "1rem", ml: "80px" }}>
                        <Avatar
                          src={userDetail[0].profilePic?userDetail[0].profilePic:ProfilePic}
                          alt="player"
                          sx={{ width: 300, height: 300 }}
                        />
                      </Grid>
                      <Grid item sx={{ my: "1rem", ml: "80px" }}>
                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Name
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].name}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Email
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].email}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Phone Number
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].phone}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Role
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].role}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Futsal Name
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[1].futsalName}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Location
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[1].location}
                          </Typography>
                        </div> 

                        {userDetail[1].description && <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Description
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[1].description}
                          </Typography>
                        </div>}

                        {userDetail[1].futsalPictures[0] && <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Futsal Photos
                          </Typography>
                          {userDetail[1].futsalPictures.map((pic)=><img src={pic}/>)}
                        </div>}
                      </Grid>
                    </Grid>
                    <Button
                    color="inherit"
                      onClick={() =>
                        setEditMode({ edit: !editMode.edit, component: "" })
                      }
                    >
                      Edit Profile
                    </Button>
                    <Button
                    color="inherit"
                      onClick={() =>
                        setEditMode({
                          edit: !editMode.edit,
                          component: "futsalDetailAdd",
                        })
                      }
                    >
                      Edit Futsal Details
                    </Button>
                  </>
                ) : (
                  <>
                    <Grid container sx={{ mt: "80px" }}>
                      <Grid item sx={{ my: "1rem", ml: "80px" }}>
                        <Avatar
                          src={userDetail[0].profilePic?userDetail[0].profilePic:ProfilePic}
                          alt="player"
                          sx={{ width: 300, height: 300 }}
                        />
                      </Grid>
                      <Grid item sx={{ my: "1rem", ml: "80px" }}>
                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Name
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].name}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Email
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].email}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Phone Number
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].phone}
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="h6" color="#a2b2c1">
                            Role
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {userDetail[0].role}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                    <Button
                    color="inherit"
                      onClick={() =>
                        setEditMode({ edit: !editMode.edit, component: "" })
                      }
                    >
                      Edit Profile
                    </Button>
                    
                  </>
                ))}
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;
