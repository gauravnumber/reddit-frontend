import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Post from "@components/Post";

import { GET_RECENT_POSTS } from "@/queries";

const Home = () => {
  const result = useQuery(GET_RECENT_POSTS);

  // console.log(`result.data`, result.data);

  return (
    <div>
      <h1>home it is</h1>
      {/* <p></p> */}
      <ul>
        <li>
          <Link to="/r/funny">r/funny</Link>
        </li>
      </ul>
      {result.data && <Post posts={result.data.getRecentPosts} />}
    </div>
  );
};

export default Home;
