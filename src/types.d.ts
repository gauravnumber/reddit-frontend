import { State as refreshState } from "@/reducer/refreshReducer";
import { State as userState } from "@/reducer/userReducer";
import { State as sortState } from "@/reducer/sortReducer";

type RootState = {
  refresh: refreshState;
  user: userState;
  sort: sortState;
};

export { RootState };

export { State as userState } from "@/reducer/userReducer";
export { State as sortState } from "@/reducer/sortReducer";
export { State as refreshState } from "@/reducer/refreshReducer";

export type postType = {
  _id: string;
  title: string;
  body: string;
  totalNumOfVotes: number;
  createdAt: string;
  owner: {
    username: string;
  };
  upvote: [
    {
      username: string;
    }
  ];
  downvote: [
    {
      username: string;
    }
  ];
  subreddit: {
    name: string;
  };
};
