import { gql } from "@apollo/client";

export const POSTS_NEEDED = gql`
  fragment postsNeeded on Post {
    _id
    title
    body
    image {
      data
      contentType
    }
    subreddit {
      name
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
    totalNumbersOfVotes
    createdAt
  }
`;

export const COMMENT_NEEDED = gql`
  fragment commentNeeded on Comment {
    _id
    body
    totalNumOfVotes

    owner {
      username
    }

    # upvote {
    #   username
    # }

    # downvote {
    #   username
    # }
  }
`;

export const UPVOTE_COMMENT = gql`
  mutation upvoteComment($commentId: String!) {
    upvoteComment(commentId: $commentId) {
      ...commentNeeded
    }
  }

  ${COMMENT_NEEDED}
`;

export const DOWNVOTE_COMMENT = gql`
  mutation downvoteComment($commentId: String!) {
    downvoteComment(commentId: $commentId) {
      ...commentNeeded
    }
  }

  ${COMMENT_NEEDED}
`;

export const SET_COMMENT_ON_COMMENT = gql`
  mutation setComment($commentId: String!, $body: String!) {
    setComment(commentId: $commentId, body: $body) {
      ...commentNeeded
    }
  }
  ${COMMENT_NEEDED}
`;

export const SET_COMMENT_ON_POST = gql`
  mutation setComment($postId: String!, $body: String!) {
    setComment(postId: $postId, body: $body) {
      ...commentNeeded
    }
  }
  ${COMMENT_NEEDED}
`;

export const GET_SINGLE_POSTS = gql`
  query getSinglePost($postId: String!) {
    getSinglePost(postId: $postId) {
      ...postsNeeded

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

  ${POSTS_NEEDED}
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
  query getRecentPosts($sort: String, $offset: Int, $limit: Int) {
    getRecentPosts(sort: $sort, offset: $offset, limit: $limit) {
      ...postsNeeded
    }
  }

  ${POSTS_NEEDED}
`;

export const DO_DOWNVOTE = gql`
  mutation downvote($postId: String!) {
    downvote(postId: $postId) {
      ...postsNeeded

      # _id
      # downvote {
      #   username
      # }
      # totalNumbersOfVotes
    }
  }
  ${POSTS_NEEDED}
`;

export const DO_UPVOTE = gql`
  mutation upvote($postId: String!) {
    upvote(postId: $postId) {
      ...postsNeeded
      # _id
      # upvote {
      #   username
      # }
      # totalNumbersOfVotes
    }
  }
  ${POSTS_NEEDED}
`;

export const GET_USER_POST = gql`
  query getPostsByUser($username: String!, $sort: String!) {
    getPostsByUser(username: $username, sort: $sort) {
      ...postsNeeded
    }
  }
  ${POSTS_NEEDED}
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
  mutation post(
    $title: String!
    $body: String
    $subredditName: String!
    $image: Upload
  ) {
    post(
      title: $title
      body: $body
      subredditName: $subredditName
      image: $image
    ) {
      ...postsNeeded
      # _id
      # title
      # body
      # image {
      #   data
      #   contentType
      # }
      # createdAt
    }
  }

  ${POSTS_NEEDED}
`;

export const GET_SUBREDDIT_POST = gql`
  query getSubredditPost(
    $name: String!
    $sort: String
    $offset: Int
    $limit: Int
  ) {
    getSubredditPost(name: $name, sort: $sort, offset: $offset, limit: $limit) {
      ...postsNeeded
    }
  }

  ${POSTS_NEEDED}
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
