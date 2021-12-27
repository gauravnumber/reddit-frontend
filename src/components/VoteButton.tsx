/**
 * Wrap this component in <Card>
 * @prop {post} postType
 */
import { useState, useEffect } from "react";
import { Card, Container, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import { DO_UPVOTE, DO_DOWNVOTE, GET_SUBREDDIT_POST } from "@/queries";
import { postType } from "@/types";

// const VoteButton = ({
//   _id,
//   totalNumOfVote,
// }: {
//   _id: string;
//   totalNumOfVote: number;
// }) => {
const VoteButton = ({ post }: { post: postType }) => {
  // const [totalNumOfVote, setTotalNumOfVote] = useState(0);
  const user = useSelector((state) => state.user);

  const {
    _id,
    totalNumOfVote,
    // totalNumOfVote: postTotalNumOfVote,
    upvote,
    downvote,
    ...rest
  } = post;

  const [upvoting, upvotingResult] = useMutation(DO_UPVOTE, {
    refetchQueries: [GET_SUBREDDIT_POST],
    variables: {
      postId: _id,
    },
  });

  const [downvoting, downvotingResult] = useMutation(DO_DOWNVOTE, {
    refetchQueries: [GET_SUBREDDIT_POST],
    variables: {
      postId: _id,
    },
  });

  // console.log(`state`, state);
  // useEffect(() => {
  //   if (upvotingResult.data !== undefined) {
  //     // setTotalNumOfVote(postTotalNumOfVote);

  //     // console.log(`upvotingResult.data`, upvotingResult.data);
  //     console.log(
  //       `upvotingResult.data.upvote.totalNumOfVote`,
  //       upvotingResult.data.upvote.totalNumOfVote
  //     );
  //     setTotalNumOfVote(upvotingResult.data.upvote.totalNumOfVote);
  //   }

  //   if (downvotingResult.data !== undefined) {
  //     // console.log(`downvotingResult.data`, downvotingResult.data);
  //     console.log(
  //       `downvotingResult.data.downvote.totalNumOfVote`,
  //       downvotingResult.data.downvote.totalNumOfVote
  //     );

  //     setTotalNumOfVote(downvotingResult.data.downvote.totalNumOfVote);
  //   }

  // }, [upvotingResult.data, downvotingResult.data, totalNumOfVote]);

  const handleUpvote = (e: React.MouseEvent) => {
    // console.log(`_id`, _id);
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
          }`}
          onClick={handleUpvote}
        >
          upvote
        </button>
        <div className="ui button basic green">{totalNumOfVote}</div>
        <button
          // className="ui button basic blue"
          className={`ui button blue ${
            downvote.some(
              (u: { username: string }) => u.username === user.username
            )
              ? ""
              : "basic"
          }`}
          onClick={handleDownvote}
        >
          downvote
        </button>
        {/* </div> */}
      </Card.Content>
    </>
  );
};

export default VoteButton;
