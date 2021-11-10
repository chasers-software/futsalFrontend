import {
    MATCHES_LIST_REQUEST,
    MATCHES_LIST_SUCCESS,
    MATCHES_LIST_FAIL
} from '../constants/matchesConstants'

export const matchesListReducer = (state = {}, action) => {
    switch (action.type) {
        case MATCHES_LIST_REQUEST:
            return {
                loading: true
            }
        case MATCHES_LIST_SUCCESS:
            return {
                loading: false,
                matches: action.payload
            }
        case MATCHES_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
    
}