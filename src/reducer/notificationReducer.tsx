export type State = {
  message: string;
  color: string;
};

type ActionType = {
  type: "ERROR_LOGIN";
  payload: State;
};
// | {
//     type: "downvote";
//     payload: string;
//   }
// | {
//     type: "updateSubreddit";
//     payload: string;
//   };

const resolver = (state: State | null = null, action: ActionType) => {
  switch (action.type) {
    case "ERROR_LOGIN":
      return action.payload;
    // case "downvote":
    //   return action.payload;
    // case "updateSubreddit":
    //   return action.payload;
    default:
      return state;
  }
};

export const loginAction = ({
  message,
  messageColor,
}: {
  message: string;
  messageColor: string;
}): ActionType => {
  return {
    type: "ERROR_LOGIN",
    payload: { message, color: messageColor },
  };
};

export default resolver;
