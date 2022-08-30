import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { InView } from "react-intersection-observer";
import { NetworkStatus, ApolloError } from "@apollo/client";
import {
  // Stack,
  // IconButton,
  // Button,
  // CardActions,
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
  variables?: {
    sort: string;
    offset: number;
    limit: number;
  };
  fetchMore: any;
  error: ApolloError | undefined;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const Post = ({
  posts,
  networkStatus,
  variables,
  fetchMore,
  error,
  setLimit,
}: PostArgument): JSX.Element | null => {
  // const [deletePostId, setDeletePostId] = useState("");
  const [fullyLoaded, setFullyLoaded] = useState(false);
  // const [loginWarning, setLoginWarning] = useState(false);
  // const dispatch = useDispatch();

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

  // if (networkStatus === NetworkStatus.loading) {
  //   return <div>Loading posts...</div>;
  // }

  if (!posts) return null;

  // const handleDelete = (post: postType) => (): void => {
  //   deletePost({
  //     variables: {
  //       username: post.owner.username,
  //       subredditName: post.subreddit.name,
  //       postId: post._id,
  //     },
  //   });
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

  // console.log(`posts[0]?.subreddit.name`, posts[0]?.subreddit.name);
  // console.log(
  //   `networkStatus !== NetworkStatus.fetchMore`,
  //   networkStatus !== NetworkStatus.fetchMore
  // );

  // console.log(`posts.length`, posts.length);
  // console.log(`variables.limit`, variables?.limit);
  // console.log(
  //   `posts.length % (variables?.limit ?? 10) === 0`,
  //   posts.length % (variables?.limit ?? 10) === 0
  // );
  // console.log(`!fullyLoaded`, !fullyLoaded);

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
      {/* {networkStatus !== NetworkStatus.fetchMore &&
        posts.length % (variables?.limit ?? 10) === 0 &&
        !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const currentPostsLength = posts.length;
                const result = await fetchMore({
                  variables: {
                    offset: currentPostsLength,
                  },
                });

                const keys = Object.keys(result.data);
                const getSubredditOrRecentPosts = keys[0];
                const fetchedPosts = result.data[getSubredditOrRecentPosts];
                setFullyLoaded(!fetchedPosts.length);
                setLimit(
                  currentPostsLength +
                    result.data[getSubredditOrRecentPosts].length
                );

                console.log(
                  `result.data[getSubredditOrRecentPosts].length`,
                  result.data[getSubredditOrRecentPosts].length
                );
              }
            }}
          >
            <h3>Load More Posts</h3>
          </InView>
        )} */}
    </Box>
  );
};

export default Post;
