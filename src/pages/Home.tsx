import Post from "@/components/Post";
import { GET_RECENT_POSTS } from "@/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

const Home = () => {
  // const sort = useSelector<RootState, sortState>((state) => state.sort);
  // const notification = useSelector<RootState, notificationState>(
  //   (state) => state.notification
  // );
  // const result = useQuery(GET_RECENT_POSTS, {
  const [getRecentPostsBySorting, result] = useLazyQuery(GET_RECENT_POSTS, {
    variables: {
      sort: "new",
    },
  });

  useEffect(() => {
    getRecentPostsBySorting();
    // console.log(`sort`, sort);
  }, []);
  // }, [sort]);

  if (result.loading)
    return (
      <div className="ui active dimmer">
        <div className="ui loader"></div>
      </div>
    );

  return (
    <div>{result.data && <Post posts={result.data.getRecentPosts} />}</div>
  );
};

export default Home;
