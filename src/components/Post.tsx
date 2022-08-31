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
  Snackbar,
  Alert,
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
  const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorEnable, setErrorEnable] = useState<boolean>(false);

  // const user = useSelector<RootState, userState>((state) => state.user);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!posts) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Snackbar open={errorEnable}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

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
      {networkStatus !== NetworkStatus.fetchMore &&
        posts.length % (variables?.limit ?? 10) === 0 &&
        !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const currentPostsLength = posts.length;
                try {
                  const result = await fetchMore({
                    variables: {
                      offset: currentPostsLength,
                      limit: 10,
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
                } catch (error) {
                  if (error instanceof Error) {
                    setErrorEnable(true);
                    setErrorMessage(error.message);
                    setTimeout(() => setErrorEnable(false), 3000);
                  }
                }
              }
            }}
          >
            <h3>Load More Posts</h3>
          </InView>
        )}
    </Box>
  );
};

export default Post;
