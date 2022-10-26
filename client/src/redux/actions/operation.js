import axios from "axios";
export const GET_ALL_OPERATIONS = "GET_ALL_OPERATIONS",
  GET_OPERATION = "GET_OPERATION",
  NEW_OPERATION = "NEW_OPERATION",
  MODIFY_OPERATION = "MODIFY_OPERATION",
  NEW_OPERATION_MODAL = "NEW_OPERATION_MODAL",
  MODIFY_OPERATION_MODAL = "MODIFY_OPERATION_MODAL",
  DELETE_OPERATION = "DELETE_OPERATION";

/////////////////////////////////////////////////////////////////////////////////////////////////

export function getAllOperations(user_id) {
  return async function (dispatch) {
    const response = await axios(`operation/?user_id=${user_id}`);
    dispatch({ type: GET_ALL_OPERATIONS, payload: response.data });
  };
}

export function getOperation(operation_id) {
  return async function (dispatch) {
    const response = await axios(`operation/${operation_id}`);
    dispatch({ type: GET_OPERATION, payload: response.data });
  };
}

export function newOperation(user_id, new_operation) {
  return async function (dispatch) {
    const response = await axios.post(`operation/${user_id}`, new_operation);
    dispatch({ type: NEW_OPERATION, payload: response.data });
  };
}

export function modifyOperation(user_id, operation_id, changes) {
  return async function (dispatch) {
    const response = await axios.patch(
      `operation/?user_id=${user_id}&operation_id=${operation_id}`,
      changes
    );
    dispatch({ type: MODIFY_OPERATION, payload: response.data });
  };
}

export function deleteOperation(user_id, operation_id) {
  return async function (dispatch) {
    const response = await axios.delete(
      `operation/?user_id=${user_id}&operation_id=${operation_id}`
    );
    dispatch({ type: DELETE_OPERATION, payload: response.data });
  };
}

export function operationModal() {
  return function (dispatch) {
    dispatch({ type: NEW_OPERATION_MODAL });
  };
}

export function stateModifyOperationModal() {
  return function (dispatch) {
    dispatch({ type: MODIFY_OPERATION_MODAL });
  };
}
