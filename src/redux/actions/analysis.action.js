import axios from 'axios';

// Action Types
export const FETCH_ANALYSIS_DATA_REQUEST = 'FETCH_ANALYSIS_DATA_REQUEST';
export const FETCH_ANALYSIS_DATA_SUCCESS = 'FETCH_ANALYSIS_DATA_SUCCESS';
export const FETCH_ANALYSIS_DATA_FAILURE = 'FETCH_ANALYSIS_DATA_FAILURE';

// Action Creators
export const fetchAnalysisData = () => async (dispatch) => {
  dispatch({ type: FETCH_ANALYSIS_DATA_REQUEST });
  try {
    const response = await axios.get('https://667e5671297972455f67ee82.mockapi.io/projectojt/api/v1/users');
    dispatch({
      type: FETCH_ANALYSIS_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ANALYSIS_DATA_FAILURE,
      payload: error.message,
    });
  }
};
