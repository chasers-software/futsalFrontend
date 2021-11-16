import axios from 'axios'
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAILS_EDIT_REQUEST,
    USER_DETAILS_EDIT_SUCCESS,
    USER_DETAILS_EDIT_FAIL
} from '../constants/userConstants.js'

export const registerUser = (formData) => async (dispatch) => {
    try
    {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        //for check
        console.log('action dispatched')
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
        let result
        if (formData.role === 'player') {
            result = await axios.post('/auth/registeruser', formData, config)
            
        }
        else if (formData.role === 'operator') {
            const operator = {
                name: formData.operator_name,
                email: formData.email,
                phone: formData.phone,
                username: formData.username,
                password: formData.password,
                role: formData.role
            }
            const futsal = {
                futsalName: formData.name,
                location: formData.location
            }
            console.log('action dispatched')
            console.log(operator, futsal)

            result = await axios.post('/auth/registerfutsal', {operator, futsal})
        }


        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: result.data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: result.data
        })

        localStorage.setItem('userInfo', JSON.stringify(result.data))
    }
    catch(error)
    {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.msg
        })
    }

}

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/auth/login', { username, password }, config)
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.msg
        })   
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}

export const userProfile=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:USER_DETAIL_REQUEST})

        if(userData)
        {

        if(userData.user.role==='player')
        {
            //for checking
            console.log('Request for userdetail')

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization':`Bearer ${userData.token}`
                }
            }

            const profileData=await axios.get(`/users/profile/${userData.user.userId}`,config)

            const profile=[profileData.data]

            //for checking
            console.log('response received',profile)

            dispatch(
                {
                    type:USER_DETAIL_SUCCESS,
                    payload:profile
                }
            )


        }

        else if(userData.user.role==='operator')
        {
             //for checking
             console.log('Request for operator detail')

             const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization':`Bearer ${userData.token}`
                }
            }

            const profileData=await axios.get(`/users/profile/${userData.user.userId}`,config)

            const operator=profileData.data

            //for checking
            console.log('response received',operator)

             const futsalData=await axios.get(`/futsal/${userData.futsal.futsalId}`)

             const futsal=futsalData.data

             //for checking
             console.log('response received',futsal)

             const editedData=[operator,futsal]


             //for checking
             console.log('final Data',editedData)
 
             dispatch(
                 {
                     type:USER_DETAIL_SUCCESS,
                     payload:editedData
                 }
             )
 

        }
    }
    else
    {
        dispatch(
            {
                type:USER_DETAIL_FAIL,
                payload:'Not Logged In'
            }
        )
    }

    }
    catch(error)
    {
        console.log(error)
       
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response.data.msg
        }) 

    }
}

export const userProfileEdit=(userId,newProfileDetails,token)=>async(dispatch)=>{
    try{

    dispatch({type:USER_DETAILS_EDIT_REQUEST})

    const config={headers: {
        'Content-Type': 'application/json',
        'authorization':`Bearer ${token}`
    }}

    const data=await axios.patch(`/users/editProfile/${userId}`,newProfileDetails,config)

    dispatch({type:USER_DETAILS_EDIT_SUCCESS})
}
catch(error)
{
    dispatch({type:USER_DETAILS_EDIT_FAIL,payload:error.response.data.msg})
}



}