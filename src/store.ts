import { createStore, combineReducers } from "redux";
// import notificationReducer from './reducer/notificationReducer'
import userReducer from "./reducer/userReducer";
import chamberReducer from "./reducer/chamberReducer";

import { composeWithDevTools } from "redux-devtools-extension";
// import { useSelector } from 'react-redux'

const reducer = combineReducers({
  // notification: notificationReducer,
  chamber: chamberReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools());
// const state = useSelector( state => state)
// console.log('state', state)

export default store;
