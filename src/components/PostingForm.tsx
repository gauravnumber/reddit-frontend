import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { refreshAction } from "@/reducer/refreshReducer";

const PostingForm = ({ subredditName }: { subredditName?: string }) => {
  const [errorEnabled, setErrorEnabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  // const [imageSrc, setImageSrc] = useState("");
  // const [imageFile, setImageFile] = useState();

  const [posting, postingResult] = useMutation(POST, {
    // refetchQueries: [GET_SUBREDDIT_POST],
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
    onError: (error) => {
      // console.log("error", error);
      setErrorMessage(error.message);
      setErrorEnabled(true);
      setTimeout(() => setErrorEnabled(false), 4000);
    },
  });

  // console.log(`postingResult`, postingResult.data);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    posting({
      variables: {
        title,
        body,
        subredditName,
        // image: imageFile,
        // image: imageSrc,
      },
      // onCompleted: (data) => console.log("data", data),
    });

    setTitle("");
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
      <Snackbar open={errorEnabled}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="dense"
        required
        error={errorEnabled}
        // autoFocus
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
      {/* <Button
        sx={{ my: 2 }}
        component="label"
      >
        Upload File
        <input
          type="file"
          id="image-input"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={onChange}
          hidden
        />
      </Button>
      <img id="image-show" src={imageSrc} /> */}
      <br />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default PostingForm;
