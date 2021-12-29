import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { refreshAction } from "@/reducer/refreshReducer";

const PostingForm = ({ subredditName }) => {
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
    <Form size="large" onSubmit={handlePost}>
      <Form.Input
        label="Title for your choice."
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.TextArea
        label="Write some body."
        onChange={(e) => setBody(e.target.value)}
        // autoFocus
      />
      <input type="submit" className="ui button" />
    </Form>
  );
};

export default PostingForm;
