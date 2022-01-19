import { gql } from "@apollo/client";

export const SET_COMMENT_ON_COMMENT = gql`
  mutation setComment($commentId: String!, $body: String!) {
    setComment(commentId: $commentId, body: $body) {
      _id
      owner {
        username
      }
      body
    }
  }
`;

export const SET_COMMENT_ON_POST = gql`
  mutation setComment($postId: String!, $body: String!) {
    setComment(postId: $postId, body: $body) {
      _id
      # owner {
      #   username
      # }
      # body
    }
  }
`;

export const GET_SINGLE_POSTS = gql`
  query getSinglePost($postId: String!) {
    getSinglePost(postId: $postId) {
      _id
      title
      body
      owner {
        username
      }

      totalNumOfVotes

      vote {
        username
      }

      upvote {
        username
      }

      downvote {
        username
      }

      comment {
        _id
        body
        owner {
          username
        }
        totalNumOfVotes
        comment {
          _id
          body
          owner {
            username
          }
          totalNumOfVotes
          comment {
            _id
            body
            owner {
              username
            }
            totalNumOfVotes
            comment {
              _id
              body
              totalNumOfVotes
              owner {
                username
              }
              totalNumOfVotes
              comment {
                _id
                body
                owner {
                  username
                }
                totalNumOfVotes
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost(
    $username: String!
    $subredditName: String!
    $postId: String!
  ) {
    deletePost(
      username: $username
      subredditName: $subredditName
      postId: $postId
    ) {
      _id
    }
  }
`;

export const GET_RECENT_POSTS = gql`
  query getRecentPosts($sort: String!) {
    getRecentPosts(sort: $sort) {
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
      totalNumOfVotes
    }
  }
`;

export const DO_DOWNVOTE = gql`
  mutation downvote($postId: String!) {
    downvote(postId: $postId) {
      _id
      totalNumOfVotes
    }
  }
`;

export const DO_UPVOTE = gql`
  mutation upvote($postId: String!) {
    upvote(postId: $postId) {
      _id
      totalNumOfVotes
    }
  }
`;

export const GET_USER_POST = gql`
  query getPostsByUser($username: String!, $sort: String!) {
    getPostsByUser(username: $username, sort: $sort) {
      # query getPostsByUser($username: String!) {
      #   getPostsByUser(username: $username) {
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
      subreddit {
        name
      }
      totalNumOfVotes
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
  query getSubredditPost($name: String!, $sort: String!) {
    getSubredditPost(name: $name, sort: $sort) {
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
      subreddit {
        name
      }
      totalNumOfVotes
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
