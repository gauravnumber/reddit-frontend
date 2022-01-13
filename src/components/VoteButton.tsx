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

// const VoteButton = ({
//   _id,
//   totalNumOfVote,
// }: {
//   _id: string;
//   totalNumOfVote: number;
// }) => {
const VoteButton = ({ post }: { post: postType }) => {
  // const [totalNumOfVote, setTotalNumOfVote] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector<RootState, userState>((state) => state.user);
  const notification = useSelector<RootState, notificationState>(
    (state) => state.notification
  );

  const {
    _id,
    totalNumOfVotes,
    // totalNumOfVote: postTotalNumOfVote,
    upvote,
    downvote,
    ...rest
  } = post;

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

      // console.log(`notification`, notification);

      console.log(
        `error.graphQLErrors[0].message`,
        error.graphQLErrors[0].message
      );
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

  // console.log(`upvote`, upvote);
  // console.log(`downvote`, downvote);
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
    // console.log(`params.subredditName`, params.subredditName);
  };

  const handleDownvote = (e: React.MouseEvent) => {
    downvoting();
  };

  return (
    <>
      <Card.Content>
        {/* <div className="ui buttons three basic"> */}
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
            // className="ui button basic blue"
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
        {/* </div> */}
      </Card.Content>
      {/* <Message attached="bottom" content="lorem lorem" /> */}
    </>
  );
};

export default VoteButton;
