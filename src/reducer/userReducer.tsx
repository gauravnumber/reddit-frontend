type State = {
  _id: string;
  username: string;
  login: string;
};

type ActionType = { type: "USER_STORE"; payload: State };

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
    default:
      return state;
  }
};

export const userStoreAction = (user: State): ActionType => {
  return {
    type: "USER_STORE",
    payload: user,
  };
};

export default reducer;
