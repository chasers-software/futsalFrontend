import {
    BOOK_MATCH_REQUEST,
    BOOK_MATCH_SUCCESS,
    BOOK_MATCH_FAIL
} from '../constants/bookMatchContstants'

export const bookMatchReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOK_MATCH_REQUEST:
            return {
                loading: true
            }
        case BOOK_MATCH_SUCCESS:
            return {
                loading: false,
                bookedMatch: action.payload
            }
        case BOOK_MATCH_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
    
}