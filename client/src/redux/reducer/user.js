import {
  GET_ALL_USERS,
  GET_USER,
  CREATE_USER,
  MODIFY_USER,
  DELETE_USER,
} from "../actions/user";

import {
  GET_ALL_OPERATIONS,
  GET_OPERATION,
  NEW_OPERATION,
  MODIFY_OPERATION,
  DELETE_OPERATION,
  NEW_OPERATION_MODAL,
} from "../actions/operation";

const initialState = {
  user: {},
  users: [],
  operation: {},
  operations: [],
  newOperationModal: false,
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_USERS:
      return { ...state, users: payload };
    case GET_USER:
      return { ...state, user: payload };
    case CREATE_USER:
      return { ...state, user: payload };
    case MODIFY_USER:
      return { ...state, user: payload };
    case DELETE_USER:
      return { ...state, user: {} };
    case GET_ALL_OPERATIONS:
      return { ...state, operations: payload };
    case GET_OPERATION:
      return { ...state, operation: payload };
    case NEW_OPERATION: ////////////////////////////////
      return { ...state, user: payload };
    case MODIFY_OPERATION:
      return { ...state, user: payload };
    case DELETE_OPERATION:
      return { ...state, user: payload };
    case NEW_OPERATION_MODAL:
      return { ...state, newOperationModal: !state.newOperationModal };

    default:
      return state;
  }
}
