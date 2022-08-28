import Post from "@/components/Post";
import PostingForm from "@/components/PostingForm";
import { GET_SUBREDDIT_POST } from "@/queries";
import { refreshState, RootState, sortState, userState } from "@/types";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

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
      offset: 0,
      limit: 10,
      sort: "new",
    },
  });

  useEffect(() => {
    getSubredditPost();
  }, [sort, params.subredditName, refreshSubredditPost]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          {user && <PostingForm subredditName={params.subredditName} />}{" "}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Post
            posts={data?.getSubredditPost}
            networkStatus={networkStatus}
            variables={variables}
            fetchMore={fetchMore}
            error={error}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Subreddit;
