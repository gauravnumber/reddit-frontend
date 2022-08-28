import { useState, useEffect } from "react";
import { useLazyQuery, useApolloClient, NetworkStatus } from "@apollo/client";
import { InView } from "react-intersection-observer";
import Post from "@/components/Post";
import { GET_RECENT_POSTS } from "@/queries";

const Home = () => {
  const [fullyLoaded, setFullyLoaded] = useState(false);
  // const sort = useSelector<RootState, sortState>((state) => state.sort);
  // const notification = useSelector<RootState, notificationState>(
  //   (state) => state.notification
  // );
  // const result = useQuery(GET_RECENT_POSTS, {
  const client = useApolloClient();

  const [
    getRecentPostsBySorting,
    { data, error, fetchMore, networkStatus, variables },
  ] = useLazyQuery(GET_RECENT_POSTS, {
    client,
    notifyOnNetworkStatusChange: true,
    variables: {
      sort: "new",
    },
  });

  useEffect(() => {
    getRecentPostsBySorting();
    // console.log(`sort`, sort);
  }, []);
  // }, [sort]);

  if (networkStatus === NetworkStatus.loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // console.log(`result`, result);

  // if (result.loading)
  //   return (
  //     <div className="ui active dimmer">
  //       <div className="ui loader"></div>
  //     </div>
  //   );

  return (
    <div>
      {data && (
        <Post
          posts={data.getRecentPosts}
          networkStatus={networkStatus}
          variables={variables}
          fetchMore={fetchMore}
        />
      )}
      {/* <InView
        onChange={(inView) => {
          if (inView) {
            fetchMore({
              variables: {
                offset: data.getRecentPosts.length,
              },
            });
          }
        }}
      >
        <h3>Load More Posts</h3>
      </InView> */}
      {/* <InView onChange={(inView) => console.log(`inView`, inView)} /> */}

      {/* {
        <InView
          onChange={async (inView) => {
            if (inView) {
              console.log("inview");
              const resultValue = await result.fetchMore({
                variables: {
                  offset: result.data.getRecentPosts.length,
                },
              });

              console.log(`resultValue`, resultValue);

              setFullyLoaded(!result.data.posts.length);
            }
          }}
        />
      } */}
    </div>
  );
};

export default Home;
