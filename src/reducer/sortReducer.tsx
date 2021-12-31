type State = {
  sort: string;
};

type ActionType = { type: string; payload: string };

// type ActionType =
//   | { type: "hot"; payload: State }
//   | { type: "top:day"; payload: State }
//   | { type: "top:week"; payload: State }
//   | { type: "top:month"; payload: State }
//   | { type: "top:alltime"; payload: State };

const reducer = (state: State | null = null, action: ActionType) => {
  // console.log("state", state);
  // console.log("action", action);

  switch (action.type) {
    case "hot":
    case "top:day":
    case "top:week":
    case "top:month":
    case "top:alltime":
      return action.payload;
    default:
      return state;
  }
};

export const sortAction = (sort: string): ActionType => {
  return {
    type: sort,
    payload: sort,
  };
};

export default reducer;
