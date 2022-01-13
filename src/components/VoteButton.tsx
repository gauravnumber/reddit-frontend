/**
 * Wrap this component in <Card>
 * @prop {post} postType
 */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Message, Card, Container, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { DO_UPVOTE, DO_DOWNVOTE, GET_SUBREDDIT_POST } from "@/queries";
import { notificationState, postType, RootState, userState } from "@/types";
import { refreshAction } from "@/reducer/refreshReducer";
import { loginAction } from "@/reducer/notificationReducer";

const VoteButton = ({ post }: { post: postType }) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, userState>((state) => state.user);

  const { _id, totalNumOfVotes, upvote, downvote, ...rest } = post;

  const [upvoting, upvotingResult] = useMutation(DO_UPVOTE, {
    update: (cache, { data }) => {
      // const dataInCache = cache.readQuery({
      //   query: GET_SUBREDDIT_POST,
      //   variables: {
      //     name: "funny",
      //     sort: "hot",
      //   },
      // });
      // console.log(`dataInCache`, dataInCache);
      dispatch(refreshAction("upvote"));
      // console.log(`data upvote`, data);
    },
    refetchQueries: [GET_SUBREDDIT_POST],
    variables: {
      postId: _id,
    },
    onError: (error) => {
      // console.log(
      //   `upvote error`,
      //   JSON.stringify(error.graphQLErrors[0].message)
      // );

      dispatch(
        loginAction({
          message: error.graphQLErrors[0].message,
          messageColor: "orange",
        })
      );

      // console.log(
      //   `error.graphQLErrors[0].message`,
      //   error.graphQLErrors[0].message
      // );
    },
  });

  const [downvoting, downvotingResult] = useMutation(DO_DOWNVOTE, {
    update: (_, { data }) => {
      dispatch(refreshAction("downvote"));
    },
    refetchQueries: [GET_SUBREDDIT_POST],
    variables: {
      postId: _id,
    },
  });

  const handleUpvote = (e: React.MouseEvent) => {
    upvoting();
  };

  const handleDownvote = (e: React.MouseEvent) => {
    downvoting();
  };

  return (
    <>
      <Card.Content>
        <div className="ui buttons">
          <button
            className={`ui button red ${
              upvote.some((u: { username: string }) => {
                if (u !== null) return u?.username === user?.username;
                else return false;
              })
                ? ""
                : "basic"
            }`}
            onClick={handleUpvote}
          >
            upvote
          </button>
          <div className="ui button basic green">{totalNumOfVotes}</div>
          <button
            className={`ui button blue ${
              downvote.some((u: { username: string }) => {
                if (u !== null) return u?.username === user?.username;
                else return false;
              })
                ? ""
                : "basic"
            }`}
            onClick={handleDownvote}
          >
            downvote
          </button>
        </div>
      </Card.Content>
    </>
  );
};

export default VoteButton;
