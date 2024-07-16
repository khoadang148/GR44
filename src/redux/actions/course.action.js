import axios from "axios";
import {
  FETCH_ENROLLED_COURSES_REQUEST,
  FETCH_ENROLLED_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_FAILURE,
  SEARCH_COURSES_REQUEST,
  SEARCH_COURSES_SUCCESS,
  SEARCH_COURSES_FAILURE,
  SET_RECENT_COURSES,
  SET_NEWEST_COURSES,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  DELETE_SAVEDCOURSES_REQUEST,
  DELETE_SAVEDCOURSES_SUCCESS,
  DELETE_SAVEDCOURSES_FAILURE,
} from "../actionType";
import { differenceInDays, parse, isValid } from "date-fns";

const API_URL = "https://667e5671297972455f67ee82.mockapi.io/projectojt/api/v1";

const isRecentCourse = (courseDate, daysThreshold = 30) => {
  try {
    const today = new Date();
    const courseParsedDate = parse(courseDate, "dd/MM/yyyy", new Date());

    if (!isValid(courseParsedDate)) {
      console.error("Invalid date:", courseDate);
      return false;
    }

    const daysDifference = differenceInDays(today, courseParsedDate);

    console.log(
      `Course date: ${courseDate}, Parsed date: ${courseParsedDate}, Days difference: ${daysDifference}`
    );
    return daysDifference <= daysThreshold;
  } catch (error) {
    console.error("Error parsing date:", error);
    return false;
  }
};
export const getAllCourses = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ENROLLED_COURSES_REQUEST });

    try {
      const coursesResponse = await axios.get(`${API_URL}/courses`);
      const allCourses = coursesResponse.data;
      console.log("All courses data:", allCourses);

      const recentCourses = allCourses.filter((course) => {
        console.log(`Course date: ${course.date}`);
        return isRecentCourse(course.date);
      });
      console.log("Recent courses data:", recentCourses);

      const newestCourses = [...allCourses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 8);

      dispatch({
        type: FETCH_ENROLLED_COURSES_SUCCESS,
        payload: allCourses,
      });

      dispatch({
        type: SET_RECENT_COURSES,
        payload: recentCourses,
      });

      dispatch({
        type: SET_NEWEST_COURSES,
        payload: newestCourses,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ENROLLED_COURSES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const getEnrolledCourses = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ENROLLED_COURSES_REQUEST });

    try {
      const userResponse = await axios.get(`${API_URL}/users/${userId}`);
      const enrolledCoursesIds = userResponse.data.enrolledCourses.map(
        (course) => course.id
      );
      const coursesResponse = await axios.get(`${API_URL}/courses`, {
        params: { id: enrolledCoursesIds.join(",") },
      });
      const filteredCourses = coursesResponse.data.filter((course) =>
        enrolledCoursesIds.includes(course.id)
      );

      dispatch({
        type: FETCH_ENROLLED_COURSES_SUCCESS,
        payload: filteredCourses,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ENROLLED_COURSES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const searchCourses = (query) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_COURSES_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/courses`, {
        params: { title: query },
      });
      dispatch({ type: SEARCH_COURSES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SEARCH_COURSES_FAILURE, error: error.message });
    }
  };
};

export const searchCoursesByInstructor = (query) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_COURSES_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/courses`, {
        params: { instructor: query },
      });
      dispatch({ type: SEARCH_COURSES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SEARCH_COURSES_FAILURE, payload: error.message });
    }
  };
};
export const createCourse = (courseData) => async (dispatch) => {
  dispatch({ type: CREATE_COURSE_REQUEST });
  try {
    const response = await axios.post(
      "https://667e5671297972455f67ee82.mockapi.io/projectojt/api/v1/courses",
      courseData
    );
    dispatch({ type: CREATE_COURSE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_COURSE_FAILURE, payload: error.message });
  }
};
export const deleteSavedCourses = (userId, courseId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_SAVEDCOURSES_REQUEST });

    try {
      const userResponse = await axios.get(`${API_URL}/users/${userId}`);
      const savedCourses = userResponse.data.savedCourses;

      const updatedCourses = savedCourses.filter(
        (course) => course.id !== courseId
      );

      await axios.put(`${API_URL}/users/${userId}`, {
        savedCourses: updatedCourses,
      });

      dispatch({
        type: DELETE_SAVEDCOURSES_SUCCESS,
        payload: updatedCourses,
      });

      dispatch({ type: FETCH_ENROLLED_COURSES_REQUEST });

      const coursesResponse = await axios.get(`${API_URL}/courses`, {
        params: { id: updatedCourses.map((course) => course.id).join(",") },
      });

      dispatch({
        type: FETCH_ENROLLED_COURSES_SUCCESS,
        payload: coursesResponse.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_SAVEDCOURSES_FAILURE,
        error: error.message,
      });
    }
  };
};


