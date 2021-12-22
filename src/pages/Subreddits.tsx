import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { showChamber } from "@/reducer/chamberReducer";
// import { useLazyQuery } from "@apollo/client";
// import { GET_SUBREDDIT_POST } from "@/queries";
// import { GET_SUBREDDIT_POST } from "../queries";

const Subreddits = () => {
  // const [chambername, setChambername] = useState("");
  // const [chamberlist, { loading, data }] = useLazyQuery(GET_SUBREDDIT_POST);

  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // dispatch?.(showChamber?.(data));
  //   if (data !== undefined) {
  //     dispatch(showChamber(data.getSubredditPost));
  //   }
  // }, [data]);

  // console.log(`state`, state);

  // const handleChambers = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   chamberlist({
  //     variables: {
  //       name: chambername,
  //     },
  //   });
  // };

  return (
    <div>
      Choose your subreddit name.
      {/* <form onSubmit={handleChambers}>
        <label htmlFor="chambername">Name the chamber</label>
        <input
          type="text"
          id="chambername"
          onChange={(e) => setChambername(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form> */}
      <Outlet />
    </div>
  );
};

export default Subreddits;
