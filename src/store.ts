import { createStore, combineReducers } from "redux";
import userReducer from "./reducer/userReducer";
// import subredditReducer from "@/reducer/subredditReducer";
import refreshReducer from "@/reducer/refreshReducer";
import sortReducer from "@/reducer/sortReducer";

import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  // notification: notificationReducer,
  refresh: refreshReducer,
  // subreddit: subredditReducer,
  user: userReducer,
  sort: sortReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
