import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Segment, Card, Icon, Form } from "semantic-ui-react";

import Post from "@/components/Post";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { showChamber } from "@/reducer/subredditReducer";
import { postType } from "@/types";

const Subreddit = () => {
  // const [subredditPosts, setSubredditPosts] = useState(null);
  const refreshSubredditPost = useSelector((state) => state.refresh);
  // console.log(`refreshSubredditPost`, refreshSubredditPost);
  const params = useParams();

  // const subredditPosts = useSelector((state) => state.subreddit);
  const dispatch = useDispatch();

  // const result = useQuery(GET_SUBREDDIT_POST, {
  //   variables: {
  //     name: params.subredditName,
  //   },
  // });
  // console.log(`params.subredditName`, params.subredditName);

  const [getSubredditPost, result] = useLazyQuery(GET_SUBREDDIT_POST, {
    variables: {
      // name: "funny",
      name: params.subredditName,
    },
    // update: (_,__) => {
    //   console.log(`_`, _)
    // }
    // },
  });

  // console.log(`params.subredditName`, params.subredditName);

  const [posting, postingResult] = useMutation(POST, {
    refetchQueries: [GET_SUBREDDIT_POST],
    update: (_, { data }) => {
      console.log(`data update`, data);
    },
  });

  const [post, setPost] = useState("");

  useEffect(() => {
    getSubredditPost();
  }, [params.subredditName, refreshSubredditPost]);
  // console.log(`subredditPosts`, subredditPosts);
  // useCallback(() => {
  //   getSubredditPost({
  //     variables: {
  //       name: params.subredditName,
  //     },
  //   });
  // }, [params.subredditName]);

  // useEffect(() => {
  //   console.log("enter in useEffect");

  //   // getSubredditPost();

  //   if (result.data !== undefined) {
  //     console.log(`result.data.getSubredditPost`, result.data.getSubredditPost);

  //     // setSubredditPosts(result.data);
  //     // dispatch(showChamber(result.data.getSubredditPost));
  //   }

  //   console.log(`params.subredditName`, params.subredditName);
  //   console.log(`result.data`, result.data);
  // }, [params.subredditName]);

  if (result.loading) {
    return <div>loading...</div>;
  }

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

  // console.log(`subredditPosts`, subredditPosts);
  // console.log(`result.data.subredditPosts`, result.data.subredditPosts);
  result.refetch();
  // console.log(`result.data`, result.data);

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
      <Grid.Row>
        {result.data && <Post posts={result.data.getSubredditPost} />}
      </Grid.Row>
    </Grid>
  );
};

export default Subreddit;
