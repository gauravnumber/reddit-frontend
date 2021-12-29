type State = {
  refresh: string;
};

type ActionType =
  | {
      type: "upvote";
      payload: string;
    }
  | {
      type: "downvote";
      payload: string;
    }
  | {
      type: "updateSubreddit";
      payload: string;
    };

const resolver = (state: State | null = null, action: ActionType) => {
  switch (action.type) {
    case "upvote":
      return action.payload;
    case "downvote":
      return action.payload;
    case "updateSubreddit":
      return action.payload;
    default:
      return state;
  }
};

export const refreshAction = (str: string) => {
  return {
    type: str,
    payload: { refresh: str },
  };
};

export default resolver;
