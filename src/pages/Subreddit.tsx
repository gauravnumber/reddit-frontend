import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Segment, Card, Icon, Form } from "semantic-ui-react";

import Post from "@components/Post";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { showChamber } from "@/reducer/subredditReducer";
import { postType } from "@/types";

const Subreddit = () => {
  const params = useParams();

  const subredditPosts = useSelector((state) => state.subreddit);
  const dispatch = useDispatch();

  const [getSubredditPost, result] = useLazyQuery(GET_SUBREDDIT_POST);
  const [posting, postingResult] = useMutation(POST, {
    refetchQueries: [GET_SUBREDDIT_POST],
  });

  const [post, setPost] = useState("");

  // console.log(`subredditPosts`, subredditPosts);

  useEffect(() => {
    getSubredditPost({
      variables: {
        name: params.subredditName,
      },
    });

    if (result.data !== undefined) {
      console.log(`result.data.getSubredditPost`, result.data.getSubredditPost);
      dispatch(showChamber(result.data.getSubredditPost));
    }
  }, [params.subredditName, result.data]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();

    posting({
      variables: {
        title: `title: ${Math.floor(Math.random() * 20)}`,
        body: post,
        subredditName: params.subredditName,
        // body: `body: ${Math.floor(Math.random() * 10)}`,
      },
    });

    //! not setting post = ""
    // setPost("");
    // console.log(post);
  };

  return (
    <Grid>
      <Grid.Row>
        {/* <Header as="h1">Write somebody.</Header> */}
        <Form size="large" onSubmit={handlePost}>
          <Form.Input
            label="Write some body."
            onChange={(e) => setPost(e.target.value)}
            autoFocus
          />
        </Form>
      </Grid.Row>
      <Grid.Row>{subredditPosts && <Post posts={subredditPosts} />}</Grid.Row>
    </Grid>
  );
};

export default Subreddit;
