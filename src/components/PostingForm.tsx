import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { refreshAction } from "@/reducer/refreshReducer";

const PostingForm = ({ subredditName }: { subredditName?: string }) => {
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const [posting, postingResult] = useMutation(POST, {
    refetchQueries: [GET_SUBREDDIT_POST],
    update: (cache, { data }) => {
      // [delete]
      // const dataInCache = cache.readQuery({
      //   query: GET_SUBREDDIT_POST,
      //   variables: {
      //     name: "funny",
      //     // name: subredditName,
      //     // sort: 'new'
      //   },
      // });
      // console.log(`dataInCache`, dataInCache);
      // [/delete]
      // dispatch(refreshAction("upvote"));
      dispatch(refreshAction("updateSubreddit"));
      // console.log(`data`, data);
      // console.log(`cache`, cache);
    },
  });

  // console.log(`postingResult`, postingResult.data);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("handle post", title, body, subredditName);

    posting({
      variables: {
        // title: `title: ${Math.floor(Math.random() * 20)}`,
        title,
        body,
        subredditName,
        // body: `body: ${Math.floor(Math.random() * 10)}`,
      },
    });

    // setTitle("");
    setBody("");
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 3,

        "& > :not(style)": {
          // m: 1,
          // p: 1,
          //  m: 1, width: "25ch"
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handlePost}
    >
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="dense"
      />
      <TextField
        label="Body"
        fullWidth
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="dense"
      />
      {/* <TextField
        // label="Image upload"
        type="file"
        fullWidth
        margin="dense"
      /> */}
      <Button
        //  variant="contained"
        sx={{ my: 2 }}
        component="label"
      >
        Upload File
        <input type="file" id="image" hidden />
      </Button>
      <br />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );

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
