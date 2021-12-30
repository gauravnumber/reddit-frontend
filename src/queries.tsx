import { gql } from "@apollo/client";

export const GET_RECENT_POSTS = gql`
  query {
    getRecentPosts {
      _id
      title
      body
      subreddit {
        name
      }
      vote {
        username
      }
      upvote {
        username
      }
      downvote {
        username
      }
      owner {
        username
      }
      totalNumOfVote
    }
  }
`;

export const DO_DOWNVOTE = gql`
  mutation downvote($postId: String!) {
    downvote(postId: $postId) {
      _id
      totalNumOfVote
    }
  }
`;

export const DO_UPVOTE = gql`
  mutation upvote($postId: String!) {
    upvote(postId: $postId) {
      _id
      totalNumOfVote
    }
  }
`;

export const GET_USER_POST = gql`
  query getPostsByUser($username: String!) {
    getPostsByUser(username: $username) {
      title
      _id
      body
      owner {
        username
      }
      upvote {
        username
      }
      downvote {
        username
      }
      totalNumOfVote
      createdAt
    }
  }
`;

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
    register(username: $username, password: $password) {
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
  query getSubredditPost($name: String!) {
    getSubredditPost(name: $name) {
      _id
      title
      body
      owner {
        username
      }
      upvote {
        username
      }
      downvote {
        username
      }
      totalNumOfVote
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
