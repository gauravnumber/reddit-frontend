import { State as refreshState } from "@/reducer/refreshReducer";
import { State as userReducer } from "@/reducer/userReducer";
import { State as sortReducer } from "@/reducer/sortReducer";

type RootState = refreshState | userReducer | sortReducer;
export { RootState };

export { State as userReducer } from "@/reducer/userReducer";

export type postType = {
  _id: string;
  title: string;
  body: string;
  totalNumOfVote: number;
  createdAt: string;
  owner: {
    username: string;
  };
  upvote: {
    username: string;
  };
  downvote: {
    username: string;
  };
  subreddit: {
    name: string;
  };
};
