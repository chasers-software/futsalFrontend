import axios from 'axios'
import {
    FUTSAL_REGISTER_REQUEST,
    FUTSAL_REGISTER_SUCCESS,
    FUTSAL_REGISTER_FAIL
} from '../constants/futsalConstants.js'

export const registerFutsal = (formData) => async (dispatch) => {
    try
    {
        dispatch({
            type: FUTSAL_REGISTER_REQUEST
        })
        //for check
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

        const { data } = await axios.post('/auth/registerfutsal', {operator, futsal})

        console.log(data)

        dispatch({
            type: FUTSAL_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('futsalInfo', JSON.stringify(data))
    }
    catch(err)
    {
        console.log(err)
        dispatch({
            type: FUTSAL_REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }

}
