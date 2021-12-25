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
};
