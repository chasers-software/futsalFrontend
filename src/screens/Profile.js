import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Avatar, Grid, CircularProgress, Typography, Button } from "@mui/material";
import Header from '../components/Header'
import Footer from '../components/Footer'
import Notification from '../components/Notification';

import './Profile.css'
import { userProfile } from '../actions/userActions';
import ProfilePic from '../images/blank-profile-picture.png'

const Profile=()=>{

    const dispatch=useDispatch();

    const userInfo=JSON.parse(localStorage.getItem('userInfo'))
    const [editMode,setEditMode]=useState({edit:false,component:''})

    const {loading,userDetail,error}=useSelector((state)=>state.userProfile)

    useEffect(()=>{
        dispatch(userProfile(userInfo))

    },[])

    const handleEdit=()=>{
      setEditMode({edit:!editMode.edit,component:''})

    }

    // //for checking
    // console.log('userInfo in localStorage',userInfo)
    
    // const {email,name,username,phone,role}=userDetail
    return(
        <>
       {
           loading?(
            <CircularProgress
              sx={{ margin: "auto", position: "absolute", top: "48%", left: "48%" }}
            />
          ):(error?(
            <>
              <Header />
              <Notification severity="error" message={error} />
              <div style={{ height: "100vh" }}>x </div>
            </>
          ):
          <>
          <Header/>
          {editMode.edit?
            (editMode.component==='futsal'?(
              <>
                 <Grid container sx={{mt:'80px'}}>
                  <Grid item sx={{my:'1rem',ml:'80px'}} sm={12}>
                    <Typography variant="h6">Add New Profile Picture</Typography>
                  </Grid>
                  <Grid item sx={{my:'1rem',ml:'80px'}} sm={12}>
                    <Typography variant="h6">Add Futsal Description</Typography>
                  </Grid>
                 </Grid>
              <Button href="/profile" onClick={()=>handleEdit()}> Save</Button>
              <Button onClick={()=>setEditMode({edit:!editMode.edit,component:''})}>Cancel</Button>
              </>
            ):
            (
              <>
                          <Grid container sx={{mt:'80px'}}>
                  <Grid item sx={{my:'1rem',ml:'80px'}}>
                    <Typography variant="h6">Add New Profile Picture</Typography>
                  </Grid>
                 
                 </Grid>
              <Button href="/profile" onClick={()=>handleEdit()}> Save</Button>
              <Button onClick={()=>setEditMode({edit:!editMode.edit,component:''})}>Cancel</Button>
              </>


            )

            )
            :
            (
              <>
                  
                 
               {userDetail && (userDetail[0].operator?(
                 <>
                 <Grid container sx={{mt:'80px'}}>
                  <Grid item sx={{my:'1rem',ml:'80px'}}>
                    <Avatar src={ProfilePic} alt='player' sx={{ width: 300, height: 300 }}/>
                  </Grid>
                  <Grid item sx={{my:'1rem',ml:'80px'}}>
                    <div>
                    <Typography variant="h6" color="#a2b2c1">Name</Typography>
                    <Typography variant="h5" gutterBottom>{userDetail[0].operator.name}</Typography>
                    </div>

                    <div>
                    <Typography variant="h6" color="#a2b2c1">Email</Typography>
                    <Typography variant="h5"  gutterBottom>{userDetail[0].operator.email}</Typography>
                    </div>

                    <div>
                    <Typography variant="h6" color="#a2b2c1">Phone Number</Typography>
                    <Typography variant="h5"  gutterBottom>{userDetail[0].operator.phone}</Typography>
                    </div>

                    <div>
                    <Typography variant="h6" color="#a2b2c1">Role</Typography>
                    <Typography variant="h5"  gutterBottom>{userDetail[0].operator.role}</Typography>
                    </div>

                    <div>
                    <Typography variant="h6" color="#a2b2c1">Futsal Name</Typography>
                    <Typography variant="h5"  gutterBottom>{userDetail[0].futsalName}</Typography>
                    </div>

                    <div>
                    <Typography variant="h6" color="#a2b2c1">Location</Typography>
                    <Typography variant="h5"  gutterBottom>{userDetail[0].location}</Typography>
                    </div>
 
                 </Grid>
                 </Grid>
                  <Button onClick={()=>setEditMode({edit:!editMode.edit,component:'futsal'})}>Edit Profile</Button>
                 </>
               )
                 :
                 (
              <>
              <Grid container sx={{mt:'80px'}}>
              <Grid item sx={{my:'1rem',ml:'80px'}}>
                <Avatar src={ProfilePic} alt='player' sx={{ width: 300, height: 300 }}/>
              </Grid>
              <Grid item sx={{my:'1rem',ml:'80px'}}>
                <div>
                <Typography variant="h6" color="#a2b2c1">Name</Typography>
                <Typography variant="h5" gutterBottom>{userDetail[0].name}</Typography>
                </div>

                <div>
                <Typography variant="h6" color="#a2b2c1">Email</Typography>
                <Typography variant="h5"  gutterBottom>{userDetail[0].email}</Typography>
                </div>

                <div>
                <Typography variant="h6" color="#a2b2c1">Phone Number</Typography>
                <Typography variant="h5"  gutterBottom>{userDetail[0].phone}</Typography>
                </div>

                <div>
                <Typography variant="h6" color="#a2b2c1">Role</Typography>
                <Typography variant="h5"  gutterBottom>{userDetail[0].role}</Typography>
                </div>


             </Grid>
             </Grid>
              <Button onClick={()=>setEditMode({edit:!editMode.edit,component:''})}>Edit Profile</Button>
             </>
                 ))
                 }
                
                 
              </>

            )
                }
          <Footer/>
          </>


      )
       }
       </>
    )
      

   
}

export default Profile