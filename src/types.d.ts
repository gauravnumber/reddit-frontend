import { State as refreshState } from "@/reducer/refreshReducer";
import { State as userState } from "@/reducer/userReducer";
import { State as sortState } from "@/reducer/sortReducer";
import { State as notificationState } from "@/reducer/notificationReducer";

type RootState = {
  refresh: refreshState;
  user: userState;
  sort: sortState;
  notification: notificationState;
};

export { RootState };

export { userState, sortState, refreshState, notificationState };
// export { State as userState } from "@/reducer/userReducer";
// export { State as sortState } from "@/reducer/sortReducer";
// export { State as refreshState } from "@/reducer/refreshReducer";
// export { State as notificationState } from "@/reducer/notificationReducer";

export type commentType = {
  _id: string;
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

  comment: [commentType];
};

export type postType = {
  _id: string;
  title: string;
  body: string;
  totalNumbersOfVotes: number;
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
