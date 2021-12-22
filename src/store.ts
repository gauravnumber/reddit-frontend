import { createStore, combineReducers } from "redux";
import userReducer from "./reducer/userReducer";
import subredditReducer from "@/reducer/subredditReducer";

import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  // notification: notificationReducer,
  subreddit: subredditReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
