import { InView } from "react-intersection-observer";
import Post from "@/components/Post";
import PostingForm from "@/components/PostingForm";
import { GET_SUBREDDIT_POST } from "@/queries";
import { refreshState, RootState, sortState, userState } from "@/types";
import {
  useQuery,
  useApolloClient,
  useLazyQuery,
  NetworkStatus,
} from "@apollo/client";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

const Subreddit = () => {
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState<number>(10);
  const params = useParams<{ subredditName: string }>();
  const client = useApolloClient();

  // const refreshSubredditPost = useSelector<RootState, refreshState>(
  //   (state) => state.refresh
  // );
  // const sort = useSelector<RootState, sortState>((state) => state.sort);
  const user = useSelector<RootState, userState>((state) => state.user);
  const [
    getSubredditPost,
    { data, networkStatus, error, variables, fetchMore },
  ] = useLazyQuery(GET_SUBREDDIT_POST, {
    client,
    // nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    variables: {
      name: params.subredditName,
      offset: 0,
      limit,
      sort: "new",
    },
  });

  useEffect(() => {
    getSubredditPost();
    // console.log(`params.subredditName`, params.subredditName);
  }, [data]);

  // useLayoutEffect(() => {
  //   getSubredditPost();
  //   console.log(`params`, params);
  // }, [data]);

  // useCallback(() => {
  //   getSubredditPost();
  // }, [data]);

  // useEffect(() => {
  //   console.log(`data`, data);
  //   console.log(`params.subredditName`, params.subredditName);
  //   setPosts(data?.getSubredditPost);
  //   return () => setPosts([]);
  // });

  // console.log(
  //   `data?.getSubredditPost[0].subreddit.name`,
  //   data?.getSubredditPost[0].subreddit.name
  // );

  if (networkStatus === NetworkStatus.loading) {
    return <div>Loading...</div>;
  }

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
              posts={data?.getSubredditPost}
              networkStatus={networkStatus}
              variables={variables}
              fetchMore={fetchMore}
              error={error}
              setLimit={setLimit}
            />
          )}
          {networkStatus !== NetworkStatus.fetchMore &&
            data?.getSubredditPost.length % (variables?.limit ?? 10) === 0 &&
            !fullyLoaded && (
              <InView
                onChange={async (inView) => {
                  if (inView) {
                    const currentPostsLength = data?.getSubredditPost.length;
                    const result = await fetchMore({
                      variables: {
                        offset: currentPostsLength,
                      },
                    });

                    const keys = Object.keys(result.data);
                    const fetchedPosts = result.data[keys[0]];
                    console.log(
                      `result.data.getSubredditPost`,
                      result?.data?.getSubredditPost
                    );
                    // console.log(`!fetchedPosts.length`, !fetchedPosts.length);
                    console.log(`currentPostsLength`, currentPostsLength);
                    console.log(
                      `currentPostsLength + result.data.getSubredditPost.length`,
                      currentPostsLength + result.data.getSubredditPost.length
                    );

                    setFullyLoaded(!fetchedPosts.length);
                    setLimit(
                      currentPostsLength + result.data.getSubredditPost.length
                    );
                  }
                }}
              >
                <h3>Load More Posts</h3>
              </InView>
            )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Subreddit;
