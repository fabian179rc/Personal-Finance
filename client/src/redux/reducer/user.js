import {
  GET_ALL_USERS,
  GET_USER,
  CREATE_USER,
  MODIFY_USER,
  DELETE_USER,
} from "../actions/user";

const initialState = {
  user: {},
  users: [],
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
    //     case GET_USER_BY_NAME:
    //       return { ...state, urlUser: payload };
    //     case USER_OPTIONS_STATE:
    //       return { ...state, userOptions: !state.userOptions };
    //     case CREATE_USER:
    //       if (payload.error)
    //         return {
    //           ...state,
    //           user: {},
    //           token: null,
    //           validToken: false,
    //           msg: { type: "error", text: payload.error, title: "Error!" },
    //         };
    //       return {
    //         ...state,
    //         token: payload.token,
    //         validToken: true,
    //         user: payload.user,
    //         msg: { type: "success", text: "Logeado correctamente", title: ":D!" },
    //       };
    //     case SIGN_IN:
    //       if (payload.error)
    //         return {
    //           ...state,
    //           user: {},
    //           token: null,
    //           validToken: false,
    //           msg: { type: "error", text: payload.error, title: "Error!" },
    //         };
    //       return {
    //         ...state,
    //         token: payload.token,
    //         validToken: true,
    //         user: payload.user,
    //         msg: { type: "success", text: "Logeado correctamente", title: ":D!" },
    //       };
    //     case MODIFY_USER:
    //       if (payload === "Incorrect") return { ...state, msg: payload };
    //       return { ...state, user: payload, msg: "Correct" };
    //     case DELETE_USER:
    //       const usersUpdated = state.users.filter((user) => user.id !== payload);
    //       return { ...state, users: usersUpdated, user: {} };
    //     case SET_TOKEN:
    //       return { ...state, token: payload.token };
    //     case IS_VALID_TOKEN:
    //       if (!payload)
    //         return {
    //           ...state,
    //           validToken: payload,
    //           user: {},
    //           token: null,
    //         };
    //       return { ...state, validToken: payload };
    //     case LOG_OUT:
    //       return {
    //         ...state,
    //         token: null,
    //         validToken: false,
    //         user: {},
    //       };
    //     case USER_CLEAN_MSG_INFO:
    //       return { ...state, msg: {} };
    //     case USER_CLEAN:
    //       return {
    //         ...state,
    //         validUser: false,
    //         user: {},
    //         validToken: null,
    //         token: null,
    //       };
    //     case USER_MODIFY_STARS:
    //       const { updatedUser, error } = payload;
    //       if (updatedUser && !error) return { ...state, user: updatedUser };
    //       return { ...state };
    //     case SET_CHAT_NOTIFICATION:
    //       return { ...state, chatNotification: payload };
    //     case GET_USER_DECKS:
    //       return { ...state, decks: payload };
    //     case CREATE_DECK:
    //       return { ...state, decks: [...state.decks, payload] };
    //     case DELETE_DECK:
    //       return {
    //         ...state,
    //         decks: state.decks.filter((e) => e.id !== payload.deckToRemove.id),
    //       };
    //     case SET_ACTIVE_DECK:
    //       return { ...state, activeDeck: payload };
    //     case SET_SELECTED_DECK:
    //       return { ...state, selectedDeck: payload };
    //     case MODIFY_USER_CARDS:
    //       payload.forEach((userCard) => {
    //         const actualUserCard = state.user.UserCards.find(
    //           (uc) => userCard.id === uc.id
    //         );
    //         actualUserCard.StatusId = userCard.StatusId;
    //       });
    //       return { ...state, user: { ...state.user } };
    //     case GET_GAMES:
    //       return { ...state, games: payload };
    //     case GET_USER_FRIENDS:
    //       return { ...state, friends: payload };
    //     case ADD_NEW_FRIEND:
    //       return { ...state, friends: [...state.friends, payload] };
    //     case DELETE_FRIEND:
    //       return { ...state, friends: payload };
    //     case GET_RANKING:
    //       return { ...state, usersRanking: payload };
    default:
      return state;
  }
}
