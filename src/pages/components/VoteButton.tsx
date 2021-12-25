/**
 * Wrap this component in <Card>
 */
import { useState, useEffect } from "react";
import { Card, Container, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DO_UPVOTE, DO_DOWNVOTE } from "@/queries";

const VoteButton = ({
  _id,
  totalNumOfVote,
}: {
  _id: string;
  totalNumOfVote: number;
}) => {
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

  // useEffect(() => {
  //   if (upvotingResult.data !== undefined) {
  //     console.log(`upvotingResult.data`, upvotingResult.data);
  //   }

  //   if (downvotingResult.data !== undefined) {
  //     console.log(`downvotingResult.data`, downvotingResult.data);
  //   }
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
        <div className="ui buttons three basic">
          <button className="ui button " onClick={handleUpvote}>
            upvote
          </button>
          <div className="ui button">{totalNumOfVote}</div>
          <button className="ui button" onClick={handleDownvote}>
            downvote
          </button>
        </div>
      </Card.Content>
    </>
  );
};

export default VoteButton;
