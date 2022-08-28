import Post from "@/components/Post";
import { GET_RECENT_POSTS } from "@/queries";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

const Home = () => {
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
      limit: 10,
    },
  });

  useEffect(() => {
    getRecentPostsBySorting();
    // console.log(`sort`, sort);
  }, []);
  // }, [sort]);

  return (
    <>
      <Post
        posts={data?.getRecentPosts}
        networkStatus={networkStatus}
        variables={variables}
        fetchMore={fetchMore}
        error={error}
      />
    </>
  );
};

export default Home;
