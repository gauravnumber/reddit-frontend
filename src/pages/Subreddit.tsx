import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Segment, Card, Icon, Form } from "semantic-ui-react";

import Post from "@/components/Post";
import PostingForm from "@/components/PostingForm";

import { POST, GET_SUBREDDIT_POST } from "@/queries";

const Subreddit = () => {
  const refreshSubredditPost = useSelector((state) => state.refresh);
  const sort = useSelector((state) => state.sort);
  const params = useParams();

  const [getSubredditPost, result] = useLazyQuery(GET_SUBREDDIT_POST, {
    variables: {
      name: params.subredditName,
      sort: sort ?? "hot",
    },
  });

  useEffect(() => {
    getSubredditPost();
  }, [sort, params.subredditName, refreshSubredditPost]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  result.refetch();

  return (
    <Grid>
      <Grid.Row columns={1}>
        <PostingForm subredditName={params.subredditName} />
      </Grid.Row>
      <Grid.Row stretched>
        {result.data && <Post posts={result.data.getSubredditPost} />}
      </Grid.Row>
    </Grid>
  );
};

export default Subreddit;
