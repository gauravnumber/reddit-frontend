import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { refreshAction } from "@/reducer/refreshReducer";

const PostingForm = ({ subredditName }: { subredditName: string }) => {
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const [posting, postingResult] = useMutation(POST, {
    refetchQueries: [GET_SUBREDDIT_POST],
    update: (cache, { data }) => {
      // const dataInCache = cache.readQuery({
      //   query: GET_SUBREDDIT_POST,
      //   variables: {
      //     name: "funny",
      //   },
      // });
      // console.log(`dataInCache`, dataInCache);
      // dispatch(refreshAction("upvote"));
      dispatch(refreshAction("updateSubreddit"));
      // console.log(`data update`, data);
    },
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();

    posting({
      variables: {
        // title: `title: ${Math.floor(Math.random() * 20)}`,
        title,
        body,
        subredditName,
        // body: `body: ${Math.floor(Math.random() * 10)}`,
      },
    });

    //! not setting post = ""
    // setPost("");
    // console.log(post);
  };

  return (
    <form className="ui form large" onSubmit={handlePost}>
      <div className="field ">
        <label htmlFor="title">Title for your choice.</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="field ">
        <textarea
          placeholder="Write something..."
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button className="ui button">Submit</button>
    </form>
  );
};

export default PostingForm;
