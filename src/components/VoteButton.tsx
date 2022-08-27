import { DO_DOWNVOTE, DO_UPVOTE } from "@/queries";
import { postType, RootState, userState } from "@/types";
import { useMutation } from "@apollo/client";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Alert,
  CardActions,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const VoteButton = ({ post }: { post: postType }) => {
  const [voteUpdated, setVoteUpdated] = useState<{
    [index: string]: postType;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorEnable, setErrorEnable] = useState<boolean>(false);

  const user = useSelector<RootState, userState>((state) => state.user);
  const { _id, totalNumbersOfVotes, upvote, downvote, ...rest } = post;

  const [upvoting] = useMutation(DO_UPVOTE, {
    update: (_, { data }) => {
      setVoteUpdated(data);
    },
    variables: {
      postId: _id,
    },
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
      setErrorEnable(true);
      setTimeout(() => setErrorEnable(false), 3000);
    },
  });

  const [downvoting] = useMutation(DO_DOWNVOTE, {
    update: (_, { data }) => {
      setVoteUpdated(data);
    },
    variables: {
      postId: _id,
    },
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
      setErrorEnable(true);
      setTimeout(() => setErrorEnable(false), 3000);
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
      <CardActions disableSpacing>
        <Snackbar open={errorEnable}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <IconButton
          color={`${
            voteUpdated?.upvote?.upvote?.some((u: { username: string }) => {
              if (u !== null) {
                return u?.username === user?.username;
              } else {
                return false;
              }
            }) ||
            upvote?.some((u: { username: string }) => {
              if (u !== null) {
                return u?.username === user?.username;
              } else {
                return false;
              }
            })
              ? "primary"
              : "default"
          }`}
          onClick={handleUpvote}
        >
          <ArrowUpward />
        </IconButton>
        <Typography color="text.secondary">{totalNumbersOfVotes}</Typography>
        <IconButton
          color={`${
            voteUpdated?.downvote?.downvote?.some((u: { username: string }) => {
              if (u !== null) {
                return u?.username === user?.username;
              } else {
                return false;
              }
            }) ||
            downvote?.some((u: { username: string }) => {
              if (u !== null) {
                return u?.username === user?.username;
              } else {
                return false;
              }
            })
              ? "secondary"
              : "default"
          }`}
          onClick={handleDownvote}
        >
          <ArrowDownward />
        </IconButton>
      </CardActions>
    </>
  );
};

export default VoteButton;
