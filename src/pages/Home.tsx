import { useState, useEffect } from "react";
import { useLazyQuery, useApolloClient, NetworkStatus } from "@apollo/client";
import { InView } from "react-intersection-observer";
import Post from "@/components/Post";
import { GET_RECENT_POSTS } from "@/queries";

const Home = () => {
  // const [fullyLoaded, setFullyLoaded] = useState(false);
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
    },
  });

  useEffect(() => {
    getRecentPostsBySorting();
    // console.log(`sort`, sort);
  }, []);
  // }, [sort]);

  // if (result.loading)
  //   return (
  //     <div className="ui active dimmer">
  //       <div className="ui loader"></div>
  //     </div>
  //   );

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
