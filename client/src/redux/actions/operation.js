import axios from "axios";
export const GET_ALL_OPERATIONS = "GET_ALL_OPERATIONS",
  GET_OPERATION = "GET_OPERATION",
  NEW_OPERATION = "NEW_OPERATION",
  MODIFY_OPERATION = "MODIFY_OPERATION",
  DELETE_OPERATION = "DELETE_OPERATION";

/////////////////////////////////////////////////////////////////////////////////////////////////

export function getAllOperations(user_id) {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/operation/?user_id=${user_id}`
    );
    dispatch({ type: GET_ALL_OPERATIONS, payload: response.data });
  };
}

export function getOperation(operation_id) {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/operation/${operation_id}`
    );
    dispatch({ type: GET_OPERATION, payload: response.data });
  };
}

export function newOperation(user_id, new_operation) {
  return async function (dispatch) {
    const response = await axios.post(
      `http://localhost:3001/operation/${user_id}`,
      new_operation
    );
    dispatch({ type: NEW_OPERATION, payload: response.data });
  };
}

export function modifyOperation(user_id, operation_id, changes) {
  return async function (dispatch) {
    const response = await axios.patch(
      `http://localhost:3001/operation/?user_id=${user_id}&?operation_id=${operation_id}`,
      changes
    );
    dispatch({ type: MODIFY_OPERATION, payload: response.data });
  };
}

export function deleteOperation(user_id, operation_id) {
  return async function (dispatch) {
    const response = await axios.delete(
      `http://localhost:3001/operation/?user_id=${user_id}&?operation_id=${operation_id}`,
      changes
    );
    dispatch({ type: DELETE_OPERATION, payload: response.data });
  };
}
