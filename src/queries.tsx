import { gql } from "@apollo/client";

export const CREATE_SUBREDDIT = gql`
  mutation setSubreddit($name: String!) {
    setSubreddit(name: $name) {
      _id
      name
    }
  }
`;

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password33) {
      _id
      username
      token
    }
  }
`;

export const POST = gql`
  mutation post($title: String!, $body: String!, $subredditName: String!) {
    post(title: $title, body: $body, subredditName: $subredditName) {
      _id
      title
      createdAt
    }
  }
`;

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
      owner {
        # _id
        username
      }
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
