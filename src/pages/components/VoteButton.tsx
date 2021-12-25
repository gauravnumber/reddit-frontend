/**
 * Wrap this component in <Card>
 */
import { useState, useEffect } from "react";
import { Card, Container, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import { DO_UPVOTE, DO_DOWNVOTE } from "@/queries";
import { postType } from "@/types";

// const VoteButton = ({
//   _id,
//   totalNumOfVote,
// }: {
//   _id: string;
//   totalNumOfVote: number;
// }) => {
const VoteButton = ({ post }: { post: postType }) => {
  const user = useSelector((state) => state.user);
  // const _id = post._id
  const { _id, totalNumOfVote, upvote, ...rest } = post;
  // console.log(`upvote.username`, upvote.username ?? "unknown");

  const [upvoting, upvotingResult] = useMutation(DO_UPVOTE, {
    variables: {
      postId: _id,
    },
  });

  const [downvoting, downvotingResult] = useMutation(DO_DOWNVOTE, {
    variables: {
      postId: _id,
    },
  });

  // console.log(`state`, state);
  // useEffect(() => {
  // console.log(`state`, state);
  // if (upvotingResult.data !== undefined) {
  //   console.log(`upvotingResult.data`, upvotingResult.data);
  // }

  // if (downvotingResult.data !== undefined) {
  //   console.log(`downvotingResult.data`, downvotingResult.data);
  // }

  // if (upvote !== undefined) {
  //   // console.log(`user`, user ?? "not");
  //   console.log(`user.username`, user.username);
  //   console.log(`upvote[0]`, upvote[0]?.username);
  //   // const temp = upvote.some((u) => u.username === user.username);
  //   // console.log(`temp`, temp);
  // }
  // }, [upvote]);
  // }, [upvotingResult.data, downvotingResult.data]);

  const handleUpvote = (e: React.MouseEvent) => {
    upvoting();
  };

  const handleDownvote = (e: React.MouseEvent) => {
    downvoting();
  };

  return (
    <>
      <Card.Content>
        {/* <div className="ui buttons three basic"> */}
        <button
          className={`ui button red ${
            upvote.some(
              (u: { username: string }) => u.username === user.username
            )
              ? ""
              : "basic"
            // upvote.username === user._id ? "" : "basic"
          }`}
          onClick={handleUpvote}
        >
          upvote
        </button>
        <div className="ui button basic green">{totalNumOfVote}</div>
        <button className="ui button basic blue" onClick={handleDownvote}>
          downvote
        </button>
        {/* </div> */}
      </Card.Content>
    </>
  );
};

export default VoteButton;
