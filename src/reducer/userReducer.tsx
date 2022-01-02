export type State = {
  _id: string;
  username: string;
  login?: string;
  token: string;
  __typename?: string;
} | null;
// export type State = {
//   _id: string;
//   username: string;
//   login: string;
// };

type ActionType =
  | { type: "USER_STORE"; payload: State }
  | { type: "LOGOUT"; payload: null };

// interface ActionType {
//   type: string;
//   data: object;
// }

const reducer = (state: State | null = null, action: ActionType) => {
  // console.log("state", state);
  // console.log("action", action);

  switch (action.type) {
    case "USER_STORE":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const userLogoutAction = (): ActionType => {
  return {
    type: "LOGOUT",
    payload: null,
  };
};

export const userStoreAction = (user: State): ActionType => {
  return {
    type: "USER_STORE",
    payload: user,
  };
};

export default reducer;
