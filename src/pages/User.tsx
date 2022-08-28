import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

import Post from "@/components/Post";

import { GET_USER_POST } from "@/queries";
import { postType, refreshState, RootState, sortState } from "@/types";
// import { Form } from "semantic-ui-react";

const User = () => {
  const sort = useSelector<RootState, sortState>((state) => state.sort);
  const refreshSubredditPost = useSelector<RootState, refreshState>(
    (state) => state.refresh
  );
  const params = useParams();
  const [getUserPost, result] = useLazyQuery(GET_USER_POST, {
    variables: {
      username: params.username,
      sort: sort ?? "hot",
    },
  });

  // console.log(`sort`, sort);
  // console.log(`result.data`, result.data);
  // console.log(`params.username`, params.username);
  useEffect(() => {
    getUserPost();
    // console.log(`refreshSubredditPost`, refreshSubredditPost);
    // console.log(`result.data`, result.data);
    // if (result.data !== undefined) {

    // }
  }, [sort, params.username, refreshSubredditPost]);

  return (
    <Container>
      {/* {result.data && <Post posts={result.data.getPostsByUser} />} */}
    </Container>
  );
};

export default User;
