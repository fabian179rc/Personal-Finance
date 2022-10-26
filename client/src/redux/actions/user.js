import axios from "axios";
export const GET_USER = "GET_USER",
  GET_ALL_USERS = "GET_ALL_USERS",
  MODIFY_USER = "MODIFY_USER",
  DELETE_USER = "DELETE_USER",
  LOG_OUT = "LOG_OUT",
  IS_VALID_TOKEN = "IS_VALID_TOKEN",
  SET_TOKEN = "SET_TOKEN",
  CREATE_USER = "CREATE_USER";

/////////////////////////////////////////////////////////////////////////////////////////////////

export function getAllUsers() {
  return async function (dispatch) {
    const response = await axios("user");
    dispatch({ type: GET_ALL_USERS, payload: response.data });
  };
}

export function getUser(id) {
  return async function (dispatch) {
    const response = await axios(`user/${id}`);
    dispatch({ type: GET_USER, payload: response.data });
  };
}

export function createUser(user) {
  return async function (dispatch) {
    const response = await axios.post("user", user);
    dispatch({ type: CREATE_USER, payload: response.data });
  };
}

export function modifyUser(id, user) {
  return async function (dispatch) {
    const response = await axios.patch(`user/${id}`, user);
    dispatch({ type: MODIFY_USER, payload: response.data });
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    const response = await axios.delete(`user/${id}`);
    dispatch({ type: DELETE_USER, payload: response.data });
  };
}

export function logOut() {
  return { type: LOG_OUT };
}
