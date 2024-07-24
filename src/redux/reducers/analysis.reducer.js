import {
    FETCH_ANALYSIS_DATA_REQUEST,
    FETCH_ANALYSIS_DATA_SUCCESS,
    FETCH_ANALYSIS_DATA_FAILURE,
  } from '../actions/analysis.action';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const analysisReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ANALYSIS_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ANALYSIS_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FETCH_ANALYSIS_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default analysisReducer;
  