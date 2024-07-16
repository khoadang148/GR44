// src/redux/actions/auth.action.js
import axios from "axios";
import Cookies from "js-cookie";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_TOKEN,
  SET_ID,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SET_ROLE, SET_USER
} from "../actionType";

const API_URL = "https://667e5671297972455f67ee82.mockapi.io/projectojt/api/v1";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: { email, password },
      });
      console.log(response);

      if (response.data && response.data.length > 0) {
        const user = response.data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          const token = `fake-jwt-token-${user.email}`;
          dispatch({ type: LOGIN_SUCCESS, payload: user });
          dispatch({ type: SET_TOKEN, payload: token });

          Cookies.set("token", token, { expires: 7 });
          Cookies.set("role", user.role, { expires: 7 });
          Cookies.set("id", user.id, { expires: 7 });
          Cookies.set("avatar", user.avatar, { expires: 7 });
        } else {
          dispatch({ type: LOGIN_FAILURE, error: "Invalid email or password" });
        }
      } else {
        dispatch({ type: LOGIN_FAILURE, error: "Invalid email or password" });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch({ type: LOGIN_FAILURE, error: "Incorrect email or password" });
      } else {
        dispatch({ type: LOGIN_FAILURE, error: error.message });
      }
    }
  };
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("avatar");
  return {
    type: LOGOUT,
  };
};

export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: token,
});

export const setRole = (role) => {
  return {
    type: "SET_ROLE",
    payload: role,
  };
};

export const setID = (id) => {
  // Thêm action lưu user
  return {
    type: SET_ID,
    payload: id,
  };
};

export const signup = (fullname, email, password, role = 'student') => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const response = await axios.post(`${API_URL}/users`, {
        fullname,
        email,
        password,
        role,
      });

      const user = response.data;
      const token = `fake-jwt-token-${user.email}`;
      dispatch({ type: SIGNUP_SUCCESS, payload: user });
      dispatch({ type: SET_TOKEN, payload: token });

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", user.role, { expires: 7 });
      Cookies.set("id", user.id, { expires: 7 });
      Cookies.set("avatar", user.avatar, { expires: 7 });

      return user;
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, error: error.message });
      throw error;
    }
  };
};
export const register = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('https://your-api-endpoint.com/register', userData);
    const { token, role, user, id, avatar } = response.data;

    Cookies.set('token', token);
    Cookies.set('role', role);
    Cookies.set('id', id);
    Cookies.set('avatar', avatar);

    dispatch({ type: LOGIN_SUCCESS, payload: user });
    dispatch({ type: SET_TOKEN, payload: token });
    dispatch({ type: SET_ROLE, payload: role });
    dispatch({ type: SET_ID, payload: id });
    dispatch({ type: SET_USER, payload: user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, error: error.message });
  }
};
export const checkEmailExists = (email) => {
  return axios.get(`https://your-api-url/check-email/${email}`);
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      // Kiểm tra xem email đã tồn tại trong hệ thống
      const emailExistsResponse = await checkEmailExists(email);

      // Nếu email tồn tại, tiến hành yêu cầu đổi mật khẩu
      if (emailExistsResponse.data.exists) {
        // Gửi yêu cầu đến server để đổi mật khẩu
        const response = await axios.post('https://your-api-url/reset-password', { email });

        // Xử lý phản hồi thành công từ server nếu cần
        dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: response.data });
        return response.data; // Trả về dữ liệu từ server nếu cần
      } else {
        // Xử lý khi email không tồn tại trong hệ thống
        throw new Error('Email not found');
      }

    } catch (error) {
      // Xử lý lỗi nếu yêu cầu thất bại
      dispatch({ type: 'FORGOT_PASSWORD_FAILURE', error });
      throw error; // Ném lỗi để bên gọi có thể xử lý
    }
  };
};