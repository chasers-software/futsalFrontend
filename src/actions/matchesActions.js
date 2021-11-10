import axios from 'axios'
import {
    MATCHES_LIST_REQUEST,
    MATCHES_LIST_SUCCESS,
    MATCHES_LIST_FAIL
} from '../constants/matchesConstants'

export const listMatches = () => async (dispatch) => {
    try {
        dispatch({
            type: MATCHES_LIST_REQUEST,
        })

        const { data } = await axios.get("/matches")
        
        dispatch({
            type: MATCHES_LIST_SUCCESS,
            payload: data.matches
        })
        
    } catch (error) {
        dispatch({
            type: MATCHES_LIST_FAIL,
            payload: error.response.data.msg
        })
    }
}