import { postType, RootState, sortState } from "@/types";
import { useLazyQuery } from "@apollo/client";
import {
  Stack,
  Box,
  IconButton,
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Dimmer, Loader } from "semantic-ui-react";
import { GET_RECENT_POSTS } from "@/queries";

const Home = () => {
  const sort = useSelector<RootState, sortState>((state) => state.sort);
  // const notification = useSelector<RootState, notificationState>(
  //   (state) => state.notification
  // );
  // const result = useQuery(GET_RECENT_POSTS, {
  const [getRecentPostsBySorting, result] = useLazyQuery(GET_RECENT_POSTS, {
    variables: {
      sort: sort,
    },
  });

  useEffect(() => {
    getRecentPostsBySorting();
    // console.log(`sort`, sort);
  }, [sort]);

  // console.log(`result.loading`, result.loading);
  if (result.loading)
    return (
      <div className="ui active dimmer">
        <div className="ui loader"></div>
      </div>
    );
  // if (result.loading) return "loading...";
  // if (result.loading)
  //   return (
  //     <Dimmer active>
  //       <Loader />
  //     </Dimmer>
  //   );

  console.log(`result.data`, result.data);

  return (
    <Box sx={{ mt: 2 }}>
      {result.data &&
        result.data.getRecentPosts.map((post: postType) => (
          <Card key={post._id} sx={{ mb: 3 }}>
            <CardHeader
              title={`r/${post.subreddit.name}`}
              // &bull;
              subheader={`u/${post.owner.username} . 4years`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {/* Lizard */}
                {post.title}
              </Typography>
              {post.body && (
                <Typography color="text.secondary" paragraph>
                  {post.body}
                </Typography>
              )}
            </CardContent>
            <CardMedia
              component="img"
              // height="200"
              image={`https://source.unsplash.com/500x300?sig=${post._id}`}
              alt="random"
            />
            <CardActions disableSpacing>
              <IconButton>
                <ArrowUpward />
              </IconButton>
              <Typography color="text.secondary">0</Typography>
              <IconButton>
                <ArrowDownward />
              </IconButton>
            </CardActions>
          </Card>
        ))}
    </Box>
    // <div>
    //   <h1>Welcome to clone of reddit.</h1>
    //   {/* <ul>
    //     <li>
    //       <Link to="/r/funny">r/funny</Link>
    //     </li>
    //   </ul> */}
    //   {/* {result.loading && "loading..."} */}
    //   {/* {result.loading && <Loader>loading</Loader>} */}
    //   {result.data && <Post posts={result.data.getRecentPosts} />}
    // </div>
  );
};

export default Home;
