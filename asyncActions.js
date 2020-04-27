const redux = require("redux");
const reduxLogger = require("redux-logger");
const reduxThunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const { createStore, applyMiddleware } = redux;
const { logger } = reduxLogger.createLogger();

const FETCH_USER = "FETCH_USER";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const initialState = {
  loading: false,
  users: [],
  errors: null
};

const fetchUsersReq = () => {
  return {
    type: FETCH_USER
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  };
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload
      };

    default:
      return state;
  }
};

const fetchUsers = () => {
  return async function (dispatch) {
    try {
      dispatch(fetchUsersReq);
      const users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      //   console.log(users);
      dispatch(fetchUsersSuccess(users.data));
    } catch (err) {
      dispatch(fetchUsersFailure(err.message));
    }
  };
};

const store = createStore(
  reducer,
  applyMiddleware(reduxThunkMiddleware, logger)
);
store.subscribe(() => {});
store.dispatch(fetchUsers());
