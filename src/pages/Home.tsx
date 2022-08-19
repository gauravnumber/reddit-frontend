import { GET_RECENT_POSTS } from "@/queries";
import { RootState, sortState } from "@/types";
import { useLazyQuery } from "@apollo/client";
import {
  Box,
  IconButton,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Dimmer, Loader } from "semantic-ui-react";

const Home = () => {
  const sort = useSelector<RootState, sortState>((state) => state.sort);
  // const notification = useSelector<RootState, notificationState>(
  //   (state) => state.notification
  // );
  // const result = useQuery(GET_RECENT_POSTS, {
  const [getRecentPostsBySorting, result] = useLazyQuery(GET_RECENT_POSTS, {
    variables: {
      sort: sort ?? "hot",
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

  return (
    <Box sx={{ mt: 2 }}>
      {Array.from(Array(5)).map((_, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography color="text.secondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              cum explicabo provident asperiores illum. Et deleniti voluptatibus
              nostrum sapiente, totam aliquam hic quaerat incidunt recusandae,
              obcaecati possimus quos beatae rem eligendi, porro deserunt
              provident fuga omnis corrupti temporibus tenetur assumenda ut.
              Minima et voluptatum numquam exercitationem pariatur! Nihil,
              aliquid tenetur!
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            // height="200"
            image={`https://source.unsplash.com/500x300?sig=${index}`}
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
