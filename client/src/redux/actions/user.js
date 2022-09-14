// import axios from "axios";
// export const GET_USER = "GET_USER";

// // import { useToken } from '../../hooks/useToken'
// /// ////////////////////////////////////////////////////////////////////////////////////////////

// export function getUser(id) {
//   return async function (dispatch) {
//     const response = await axios(`user?id=${id}`);
//     dispatch({ type: GET_USER, payload: response.data });
//   };
// }

// export function getAllUsers() {
//   return async function (dispatch) {
//     const response = await axios("user");
//     dispatch({ type: GET_ALL_USERS, payload: response.data });
//   };
// }

// export function getUserByEmail(email) {
//   return async function (dispatch) {
//     const response = await axios(`user?email=${email}`);
//     dispatch({ type: GET_USER_BY_EMAIL, payload: response.data });
//   };
// }

// export function getUserGames(id) {
//   return async function (dispatch) {
//     const response = await axios(`user/games?id=${id}`);
//     dispatch({ type: GET_GAMES, payload: response.data.games.reverse() });
//   };
// }

// export function getUserByName(username) {
//   return async function (dispatch) {
//     const response = await axios(`user/username/${username}`);
//     dispatch({ type: GET_USER_BY_NAME, payload: response.data });
//   };
// }

// // export function getByEmail(email) {
// //   return async function (dispatch) {
// //     const response = await axios(`user?email=${email}`);
// //     dispatch({ type: GET_USER_BY_EMAIL, payload: response.data });
// //   };
// // }

// export function createUser(user) {
//   return async function (dispatch) {
//     const response = await axios.post("login/signup", user);
//     dispatch({ type: CREATE_USER, payload: response.data });
//   };
// }

// export function createUserGoogle(user) {
//   return async function (dispatch) {
//     const response = await axios.post("createuser", user);
//     dispatch({ type: SIGN_IN, payload: response.data });
//   };
// }

// export function signIn(user) {
//   return async function (dispatch) {
//     try {
//       const response = await axios.post("login/signin", user);
//       dispatch({ type: SIGN_IN, payload: response.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }

// export function setToken(credentials) {
//   return { type: SET_TOKEN, payload: credentials };
// }
// export function logOut() {
//   return { type: LOG_OUT };
// }

// export const userCleanMsgInfo = () => {
//   return { type: USER_CLEAN_MSG_INFO };
// };
// export function userClean() {
//   return { type: USER_CLEAN };
// }
// export function userOptionsState() {
//   return { type: USER_OPTIONS_STATE };
// }

// export function modifyUser(id, property, norender) {
//   if (norender) {
//     return function () {
//       axios.patch(`user/${id}`, property);
//     };
//   }
//   return async function (dispatch) {
//     const response = await axios.patch(`user/${id}`, property);
//     dispatch({ type: MODIFY_USER, payload: response.data });
//   };
// }

// export function deleteUser(id, norender) {
//   if (norender) {
//     return function () {
//       axios.delete(`user/?id=${id}`);
//     };
//   }
//   return async function (dispatch) {
//     const response = await axios.delete(`user/?id=${id}`);
//     dispatch({ type: DELETE_USER, payload: response.data });
//   };
// }

// export function isValidToken(id, token) {
//   return async function (dispatch) {
//     if (!token) token = "none";
//     try {
//       const response = await axios(`login/${token}?id=${id}`);
//       dispatch({ type: IS_VALID_TOKEN, payload: response.data });
//     } catch (error) {
//       // console.error('STAR_CARDS_ERROR', 'tenes q logearte pa')
//     }
//   };
// }

// export function purchaseCompleted(id, items, paymentId) {
//   return async function (dispatch) {
//     try {
//       const { data } = await axios.get(`transaction/paymentId/${paymentId}`);
//       // Si ya existe data es poruqe la transicción ya fue acreditada.
//       if (data) return;
//       const response = await axios.patch(`user/${id}`, { items });
//       await axios.post("transaction/", {
//         data: { paymentId, items, userId: id, type: "money" },
//       });
//       dispatch({ type: MODIFY_USER, payload: response.data });
//     } catch (error) {
//       console.log("error");
//     }
//   };
// }

// export function getUserDecks(userId, deckId) {
//   return async function (dispatch) {
//     let response;
//     if (deckId)
//       response = await axios.get(`/userDecks/${userId}?deckId=${deckId}`);
//     else {
//       response = await axios.get(`/userDecks/${userId}`);
//     }
//     dispatch({ type: GET_USER_DECKS, payload: response.data });
//   };
// }
// export function createDeck(userId, deck, name) {
//   // console.log('userId--->',userId,'deck--->', deck,'name--->', name)
//   return async function (dispatch) {
//     const response = await axios.post(`userDecks/${userId}`, {
//       newDeckCards: deck,
//       name,
//     });
//     dispatch({ type: CREATE_DECK, payload: response.data });
//   };
// }
// export function deleteDeck(userId, deckId) {
//   return async function (dispatch) {
//     const response = await axios.delete(`/userDecks/${deckId}/${userId}`);
//     dispatch({ type: DELETE_DECK, payload: response.data });
//   };
// }
// export function setActiveDeck(deck, userId) {
//   console.log(deck, userId);
//   return async function (dispatch) {
//     await axios.patch(`/user/defaultDeck/${deck.id}/${userId}`);

//     dispatch({ type: SET_ACTIVE_DECK, payload: deck });
//   };
// }
// export function setNewSelectedDeck(deck) {
//   return { type: SET_SELECTED_DECK, payload: deck };
// }
// export function addDeckCard(cardId) {
//   return { type: ADD_CARD_TO_DECK, payload: cardId };
// }
// export function updateDeck(userId, deckId, newDeck) {
//   return async function (dispatch) {
//     const response = await axios.patch(
//       `/userDecks/${userId}/${deckId}`,
//       newDeck
//     );
//     dispatch({ type: UPDATE_DECK, payload: response.data });
//   };
// }
// export function removeDeckCard(cardId) {
//   return { type: REMOVE_DECK_CARD, payload: cardId };
// }
// export function setChatNotification(flag) {
//   return { type: SET_CHAT_NOTIFICATION, payload: flag };
// }

// export function setLastSeenMsg(userId, privChatId, msgNum) {
//   return async function (dispatch) {
//     await axios.patch("chat", { userId, privChatId, msgNum });

//     dispatch(getUser(userId));
//   };
// }

// export function setOutNotifications(receiverId, flag) {
//   return async function (dispatch) {
//     await axios.patch("chat/notifications", { receiverId, flag });

//     dispatch(getUser(receiverId));
//   };
// }

// export function getUserFriends(userId) {
//   return async function (dispatch) {
//     const response = await axios.get(`/userFriends?userId=${userId}`);
//     dispatch({ type: GET_USER_FRIENDS, payload: response.data });
//   };
// }

// export function addNewFriend(userId, friendId) {
//   return async function (dispatch) {
//     const response = await axios.post("/userFriends", { userId, friendId });
//     dispatch({ type: ADD_NEW_FRIEND, payload: response.data });
//   };
// }

// export function deleteFriend(object) {
//   return async function (dispatch) {
//     const response = await axios.delete("/userFriends", { data: object });
//     dispatch({ type: DELETE_FRIEND, payload: response.data });
//   };
// }

// export function getRanking() {
//   return async function (dispatch) {
//     const response = await axios(`user/ranking`);
//     dispatch({ type: GET_RANKING, payload: response.data });
//   };
// }
