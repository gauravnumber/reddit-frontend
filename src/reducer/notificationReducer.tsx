export type State = {
  message: string;
  messageColor: string;
};

type ActionType =
  | {
      type: "ERROR_LOGIN";
      payload: State;
    }
  | {
      type: "NULL";
      payload: null;
    };
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
    payload: { message, messageColor },
  };
};

export const nullAction = (): ActionType => {
  return {
    type: "NULL",
    payload: null,
  };
};

export default resolver;
