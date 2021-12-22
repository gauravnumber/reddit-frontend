import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { GET_SUBREDDIT_POST } from "@/queries";
import { showChamber } from "@/reducer/subredditReducer";

const Subreddit = () => {
  const params = useParams();
  const [getSubredditPost, result] = useLazyQuery(GET_SUBREDDIT_POST);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.subreddit);

  console.log(`state`, state);

  useEffect(() => {
    getSubredditPost({
      variables: {
        name: params.subredditName,
      },
    });

    if (result.data !== undefined) {
      dispatch(showChamber(result.data.getSubredditPost));
    }
  }, [params.subredditName, result.data]);

  return <div>Single Subreddit name: {params.subredditName}</div>;
};

export default Subreddit;
