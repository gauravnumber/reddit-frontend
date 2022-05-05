import { GET_RECENT_POSTS } from "@/queries";
import { RootState, sortState } from "@/types";
import { useLazyQuery } from "@apollo/client";
import Post from "@components/Post";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import {Dimmer, Loader } from "semantic-ui-react";

const Home = () => {
  const sort = useSelector<RootState, sortState>((state) => state.sort);
  // const notification = useSelector<RootState, notificationState>(
  //   (state) => state.notification
  // );
  // const result = useQuery(GET_RECENT_POSTS, {
  const [getRecentPostsBySorting, result] = useLazyQuery(GET_RECENT_POSTS, {
    variables: {
      sort: sort ?? "hot",
    },
  });

  useEffect(() => {
    getRecentPostsBySorting();
  }, [sort]);

  // console.log(`result.loading`, result.loading);

  if (result.loading) return "loading...";
  // if (result.loading) return <Loader />;

  return (
    <div>
      <h1>Welcome to clone of reddit.</h1>
      {/* <ul>
        <li>
          <Link to="/r/funny">r/funny</Link>
        </li>
      </ul> */}
      {/* {result.loading && "loading..."} */}
      {/* {result.loading && <Loader>loading</Loader>} */}
      {result.data && <Post posts={result.data.getRecentPosts} />}
    </div>
  );
};

export default Home;
