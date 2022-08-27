import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  IconButton,
  Button,
  CardActions,
  Typography,
  Snackbar,
  Alert,
  // Card,
  // CardHeader,
  // CardContent,
  // Box,
  // CardMedia,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Message, Card, Container, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { DO_UPVOTE, DO_DOWNVOTE, GET_SUBREDDIT_POST } from "@/queries";
import { notificationState, postType, RootState, userState } from "@/types";
import { refreshAction } from "@/reducer/refreshReducer";
import { loginAction } from "@/reducer/notificationReducer";

const VoteButton = ({ post }: { post: postType }) => {
  const [voteUpdated, setVoteUpdated] = useState<
    { upvote: postType } | { downvote: postType } | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorEnable, setErrorEnable] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector<RootState, userState>((state) => state.user);

  const { _id, totalNumbersOfVotes, upvote, downvote, ...rest } = post;

  const [upvoting] = useMutation(DO_UPVOTE, {
    update: (cache, { data }) => {
      setVoteUpdated(data);
      // console.log("data", data.upvote.upvote);
      // console.log(
      //   `${data?.upvote?.upvote?.some((u: { username: string }) => {
      //     if (u !== null) {
      //       return u?.username === user?.username;
      //     } else {
      //       return false;
      //     }
      //   })}`
      // );
    },
    // refetchQueries: [GET_SUBREDDIT_POST],
    variables: {
      postId: _id,
    },
    onError: (error) => {
      // console.log(`JSON.stringify(error)`, JSON.stringify(error));
      setErrorMessage(error.graphQLErrors[0].message);
      setErrorEnable(true);
      setTimeout(() => setErrorEnable(false), 3000);
      // dispatch(
      //   loginAction({
      //     message: error.graphQLErrors[0].message,
      //     messageColor: "orange",
      //   })
      // );
    },
  });

  const [downvoting] = useMutation(DO_DOWNVOTE, {
    update: (_, { data }) => {
      // dispatch(refreshAction("downvote"));
      console.log(`data`, data);
      console.log(`voteUpdated`, voteUpdated);
      setVoteUpdated(data);

      console.log(
        `${data?.downvote?.downvote?.some((u: { username: string }) => {
          if (u !== null) {
            return u?.username === user?.username;
          } else {
            return false;
          }
        })}`
      );
    },
    // refetchQueries: [GET_SUBREDDIT_POST],
    variables: {
      postId: _id,
    },
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
      setErrorEnable(true);
      setTimeout(() => setErrorEnable(false), 3000);

      // dispatch(
      //   loginAction({
      //     message: error.graphQLErrors[0].message,
      //     messageColor: "orange",
      //   })
      // );
    },
  });

  const handleUpvote = (e: React.MouseEvent) => {
    upvoting();
  };

  const handleDownvote = (e: React.MouseEvent) => {
    downvoting();
  };

  // console.log(`upvote`, upvote);
  // console.log(`downvote`, downvote);
  // console.log(`voteUpdated`, voteUpdated);
  // if (!voteUpdated) return null;

  return (
    <>
      <CardActions disableSpacing>
        <Snackbar open={errorEnable} autoHideDuration={2000}>
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
          <div className="ui button basic green">{totalNumbersOfVotes}</div>
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
