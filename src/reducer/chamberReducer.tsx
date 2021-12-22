type State = {
  _id: string;
  title: string;
  body: string;
  totalNumOfVote: number;
  createdAt: string;
};

type ActionType = {
  type: "SHOW_CHAMBER";
  payload: State;
};

const reducer = (state: State | null = null, action: ActionType) => {
  switch (action.type) {
    case "SHOW_CHAMBER":
      return action.payload;
    default:
      return state;
  }
};

export const showChamber = (data: State): ActionType => {
  return {
    type: "SHOW_CHAMBER",
    payload: data,
  };
};

export default reducer;
