import axios from 'axios'
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/userConstants.js'

export const registerUser = (formData) => async (dispatch) => {
    try
    {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        //for check
        console.log('action dispatched')

        const { data } = await axios.post('/api/v1/auth/registerUser', formData)

        console.log(data)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(err)
    {
        console.log(err)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }

}
