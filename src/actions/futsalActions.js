import axios from "axios";

import {
  FUTSAL_DETAILS_EDIT_REQUEST,
  FUTSAL_DETAILS_EDIT_SUCCESS,
  FUTSAL_DETAILS_EDIT_FAIL,
} from "../constants/futsalConstants";

export const futsalDetailEdit = (userData, patchData) => async (dispatch) => {
  try {
    //for check
    console.log("Request for futsal edit dispatched");

    dispatch({ type: FUTSAL_DETAILS_EDIT_REQUEST });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "authorization": `Bearer ${userData.token}`,
    //   },
    // };

    const data = await axios.patch(
      `/futsal/editFutsalDetail/${userData.futsal.futsalId}`,
      patchData
    );

    //for check
    console.log("Response after edit received", data);

    dispatch({ type: FUTSAL_DETAILS_EDIT_SUCCESS});
  } catch (error) {
    dispatch({
      type: FUTSAL_DETAILS_EDIT_FAIL,
      payload: error.response.data.msg,
    });
  }
};
