import {
  FUTSAL_DETAILS_EDIT_REQUEST,
  FUTSAL_DETAILS_EDIT_SUCCESS,
  FUTSAL_DETAILS_EDIT_FAIL,
} from "../constants/futsalConstants";

export const futsalDetailEditReducer = (state = {}, action) => {
  switch (action.type) {
    case FUTSAL_DETAILS_EDIT_REQUEST:
      return {
        loading: true,
      };
    case FUTSAL_DETAILS_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case FUTSAL_DETAILS_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
