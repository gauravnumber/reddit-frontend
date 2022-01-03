import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Segment, Card, Icon, Form } from "semantic-ui-react";

import Post from "@/components/Post";
import PostingForm from "@/components/PostingForm";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { refreshState, RootState, sortState } from "@/types";

const Subreddit = () => {
  const refreshSubredditPost = useSelector<RootState, refreshState>(
    (state) => state.refresh
  );
  const sort = useSelector<RootState, sortState>((state) => state.sort);
  const params = useParams<{ subredditName: string }>();

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
