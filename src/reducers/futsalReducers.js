import {
    FUTSAL_REGISTER_REQUEST,
    FUTSAL_REGISTER_SUCCESS,
    FUTSAL_REGISTER_FAIL
} from '../constants/futsalConstants'

export const futsalRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case FUTSAL_REGISTER_REQUEST:
            return {
                futsalLoading: true
            }
        case FUTSAL_REGISTER_SUCCESS:
            return {
                FutsalLoading: false,
                operatorInfo: action.payload.user,
                futsalInfo: action.payload.futsal,
                futsalToken: action.payload.token,
            }
        case FUTSAL_REGISTER_FAIL:
            return {
                futsalLoading: false,
                futsalError: action.payload,
            }
        default:
            return state
    }
}