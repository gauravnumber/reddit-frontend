import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  useApolloClient,
  useQuery,
  useLazyQuery,
  useMutation,
  NetworkStatus,
} from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Segment, Card, Icon, Form } from "semantic-ui-react";

import Post from "@/components/Post";
import PostingForm from "@/components/PostingForm";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { refreshState, RootState, sortState, userState } from "@/types";

const Subreddit = () => {
  const client = useApolloClient();

  const refreshSubredditPost = useSelector<RootState, refreshState>(
    (state) => state.refresh
  );
  const sort = useSelector<RootState, sortState>((state) => state.sort);
  const user = useSelector<RootState, userState>((state) => state.user);

  const params = useParams<{ subredditName: string }>();

  const [
    getSubredditPost,
    { data, networkStatus, error, variables, fetchMore },
  ] = useLazyQuery(GET_SUBREDDIT_POST, {
    client,
    notifyOnNetworkStatusChange: true,
    variables: {
      name: params.subredditName,
      // sort: sort ?? "new",
    },
  });

  useEffect(() => {
    getSubredditPost();
  }, [sort, params.subredditName, refreshSubredditPost]);

  // if (result.loading) {
  //   return <div>loading...</div>;
  // }
  // if (networkStatus === NetworkStatus.loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  // console.log(`result`, result);
  // result.refetch();

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          {user && <PostingForm subredditName={params.subredditName} />}{" "}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {data && (
            <Post
              posts={data.getSubredditPost}
              networkStatus={networkStatus}
              variables={variables}
              fetchMore={fetchMore}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Subreddit;
