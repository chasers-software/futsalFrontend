import axios from "axios";
import {
  BOOK_MATCH_REQUEST,
  BOOK_MATCH_SUCCESS,
  BOOK_MATCH_FAIL,
} from "../constants/bookMatchContstants";

export const bookMatch = (match) => async (dispatch, getState) => {

  try {
    dispatch({
      type: BOOK_MATCH_REQUEST,
    });
      
   const {
      userLogin: { userInfo },
    } = getState()
      
   const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.patch(
        `/matches/book/${match._id}`,
        {},
        config
      );

    dispatch({
      type: BOOK_MATCH_SUCCESS,
      payload: data
    });
  }
  catch (error) {
    dispatch({
      type: BOOK_MATCH_FAIL,
      payload: error.response.data.msg,
    });
  }
};