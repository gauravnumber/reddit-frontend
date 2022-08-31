import Post from "@/components/Post";
import { GET_RECENT_POSTS } from "@/queries";
import { useApolloClient, useLazyQuery, NetworkStatus } from "@apollo/client";
import { useState, useEffect } from "react";

const Home = () => {
  const [limit, setLimit] = useState<number>(10);
  // const sort = useSelector<RootState, sortState>((state) => state.sort);
  const client = useApolloClient();

  const [
    getRecentPostsBySorting,
    { data, error, fetchMore, networkStatus, variables },
  ] = useLazyQuery(GET_RECENT_POSTS, {
    client,
    notifyOnNetworkStatusChange: true,
    variables: {
      sort: "new",
      offset: 0,
      limit,
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

  return (
    <>
      {data && (
        <Post
          // key="recent"
          posts={data.getRecentPosts}
          networkStatus={networkStatus}
          variables={variables}
          fetchMore={fetchMore}
          error={error}
          setLimit={setLimit}
        />
      )}
    </>
  );
};

export default Home;
