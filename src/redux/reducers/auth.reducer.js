import Cookies from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_TOKEN,
  SET_ROLE,
  SET_USER,
  SET_ID,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE

} from "../actionType";

const initialState = {
  token: Cookies.get("token") || null, 
  role: Cookies.get("role") || null, 
  user: null,
  error: null,
  loading: false,
  id: Cookies.get("id") || null,
  avatar: Cookies.get("avatar") || null,
  username: Cookies.get("username") || null,
  email: Cookies.get("email") || null,
  forgotPassword: {
    defaultPassword: null,
    error: null,
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        avatar: Cookies.get("avatar"), // Save avatar to state
        username: Cookies.get("username"),
        email:  Cookies.get("email"),
        error: null,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        role: null, 
        avatar: null,
        username: null
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ROLE:
      return {
        ...state,
        role: Cookies.get("role"),
      };
    case SET_ID: 
      return {
        ...state,
        id: Cookies.get("id"),
      };
      case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          loading: true,
          error: null,
        }
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          defaultPassword: action.payload.defaultPassword,
        }
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          error: action.payload.error,
        }
      };
    default:
      return state;
  }
};


export default authReducer;