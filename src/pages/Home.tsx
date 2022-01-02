import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useLazyQuery } from "@apollo/client";

import Post from "@components/Post";

import { GET_RECENT_POSTS } from "@/queries";
import { RootState, sortState } from "@/types";

const Home = () => {
  const sort = useSelector<RootState, sortState>((state) => state.sort);
  // const result = useQuery(GET_RECENT_POSTS, {
  const [getRecentPostsBySorting, result] = useLazyQuery(GET_RECENT_POSTS, {
    variables: {
      sort: sort ?? "hot",
    },
  });

  useEffect(() => {
    getRecentPostsBySorting();
  }, [sort]);
  // console.log(`result.data`, result.data);

  return (
    <div>
      <h1>Welcome to clone of reddit.</h1>
      {/* <p></p> */}
      {/* <ul>
        <li>
          <Link to="/r/funny">r/funny</Link>
        </li>
      </ul> */}
      {result.data && <Post posts={result.data.getRecentPosts} />}
    </div>
  );
};

export default Home;
