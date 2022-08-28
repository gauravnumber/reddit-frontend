import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { InView } from "react-intersection-observer";
import { NetworkStatus, ApolloError } from "@apollo/client";
import {
  Stack,
  IconButton,
  Button,
  CardActions,
  Card,
  CardHeader,
  CardContent,
  Box,
  CardMedia,
  Typography,
} from "@mui/material";
// import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

// import { Popup, SemanticCOLORS, Message, Card } from "semantic-ui-react";
// import { useMutation } from "@apollo/client";

import VoteButton from "@/components/VoteButton";

// import { sortAction } from "@/reducer/sortReducer";
// import { refreshAction } from "@/reducer/refreshReducer";
// import { DELETE_POST } from "@/queries";
import {
  //  notificationState,
  postType,
  RootState,
  userState,
} from "@/types";
// import { loginAction } from "@/reducer/notificationReducer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostArgument {
  posts: postType[];
  networkStatus: NetworkStatus;
  variables: unknown;
  fetchMore: any;
  error: ApolloError | undefined;
}

const Post = ({
  posts,
  networkStatus,
  variables,
  fetchMore,
  error,
}: PostArgument): JSX.Element | null => {
  // const [deletePostId, setDeletePostId] = useState("");
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [loginWarning, setLoginWarning] = useState(false);
  const dispatch = useDispatch();

  // const notification = useSelector<RootState, notificationState>(
  //   (state) => state.notification
  // );

  const user = useSelector<RootState, userState>((state) => state.user);

  // console.log(`dayjs().format('L')`, dayjs().format("L"));

  // const [deletePost, result] = useMutation(DELETE_POST, {
  //   update: (cache, { data }) => {
  //     // let dataInCache = cache.readQuery({
  //     //   query: GET_SUBREDDIT_POST,

  //     //   variables: {
  //     //     name: "funny",
  //     //     sort: "hot",
  //     //   },
  //     // });

  //     // cache.writeQuery({
  //     //   query: GET_SUBREDDIT_POST,

  //     //   variables: {
  //     //     name: "funny",
  //     //     sort: "hot",
  //     //   },

  //     //   data: {
  //     //     dataInCache: {
  //     //       getSubredditPost: dataInCache.getSubredditPost.filter(
  //     //         (post) => post._id !== deletePostId
  //     //       ),
  //     //     },
  //     //   },
  //     // });

  //     // console.log(`dataInCache`, dataInCache);
  //     // console.log(`data`, data);
  //     dispatch(refreshAction("updateSubreddit"));
  //   },
  //   onError: (error) => {
  //     dispatch(
  //       loginAction({
  //         message: error.graphQLErrors[0].message,
  //         messageColor: "orange",
  //       })
  //     );

  //     // setTimeout(() => {
  //     //   setLoginWarning(false);
  //     //   // nullAction();
  //     // }, 1000);

  //     //? clear error message for login first
  //     // setTimeout(() => nullAction(), 5000);

  //     // console.log(JSON.stringify(error));
  //   },
  // });
  // console.log(`error`, error);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!posts) return null;

  // console.log(`deletePostId`, deletePostId);

  // useEffect(() => {
  //   if (notification) {
  //     setLoginWarning(true);
  //     setTimeout(() => {
  //       setLoginWarning(false);
  //       // nullAction();
  //     }, 5000);
  //   }
  // }, [notification]);

  // const handleDelete = (post: postType) => (): void => {
  //   // setDeletePostId(post._id);

  //   deletePost({
  //     variables: {
  //       username: post.owner.username,
  //       subredditName: post.subreddit.name,
  //       postId: post._id,
  //     },
  //   });

  //   // console.log(`post._id`, post._id);
  // };

  // const handleSort = (sort: string) => (): void => {
  //   dispatch(sortAction(sort));
  // };

  // const sortButtons = () => (
  //   <Card fluid>
  //     <Card.Content>
  //       <div className="ui buttons vertical fluid">
  //         <button className="ui button" onClick={handleSort("hot")}>
  //           New
  //         </button>
  //         <button className="ui button" onClick={handleSort("top:day")}>
  //           Top: Day
  //         </button>
  //         <button className="ui button" onClick={handleSort("top:week")}>
  //           Top: Week
  //         </button>
  //         <button className="ui button" onClick={handleSort("top:month")}>
  //           Top: Month
  //         </button>
  //         <button className="ui button" onClick={handleSort("top:alltime")}>
  //           Top: All time
  //         </button>
  //       </div>
  //     </Card.Content>
  //   </Card>
  // );

  // console.log(`dayjs()`, dayjs(1640704399243).fromNow());
  // console.log(`result?.data`, result?.data);

  // console.log(`posts`, posts);
  if (networkStatus === NetworkStatus.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {posts &&
        posts.map((post: postType) => (
          <Card key={post._id} sx={{ mb: 3 }}>
            <CardHeader
              title={
                <Link to={`/r/${post.subreddit.name}`}>
                  r/{post.subreddit.name}
                </Link>
              }
              // &bull;
              subheader={`u/${post.owner.username} \u2022 ${dayjs(
                parseInt(post.createdAt)
              ).fromNow()}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              {post.body && (
                <Typography color="text.secondary" paragraph>
                  {post.body}
                </Typography>
              )}
            </CardContent>
            {post.image?.data && (
              <CardMedia
                component="img"
                // height="200"
                image={`${import.meta.env.VITE_UPLOAD}/${post.image.data}`}
                alt={post.title}
              />
            )}
            <VoteButton post={post} />
          </Card>
        ))}
      <InView
        onChange={(inView) => {
          if (inView) {
            console.log(`posts.length`, posts.length);
            fetchMore({
              variables: {
                offset: posts.length,
              },
            });
          }
        }}
      >
        <h3>Load More Posts</h3>
      </InView>

      {/* {
        <InView
          onChange={(inView) => {
            console.log("inview");
            if (inView) {
            }
          }}
        />
      } */}

      {/* {networkStatus !== NetworkStatus.fetchMore &&
        posts.length % variables.limit === 0 &&
        !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const result = await fetchMore({
                  variables: {
                    offset: posts.length,
                  },
                });

                console.log(`result`, result);

                setFullyLoaded(!result.data.posts.length);
              }
            }}
          />
        )} */}
    </Box>
  );
};

export default Post;
