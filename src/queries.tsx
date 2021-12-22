import { gql } from "@apollo/client";

export const GET_SUBREDDIT_POST = gql`
  # query getSubredditPost($subredditId: String!) {
  query getSubredditPost($name: String!) {
    getSubredditPost(
      name: $name # sort: "top:alltime"
    ) {
      # _id
      # title
      # createdAt
      # _id
      title
      body
      # owner {
      #   # _id
      #   username
      # }
      # upvote {
      #   # _id
      #   username
      # }
      totalNumOfVote
      # upvote {
      #   username
      # }
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      token
    }
  }
`;
