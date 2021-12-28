import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

import Post from "@/components/Post";

import { GET_USER_POST } from "@/queries";
import { postType } from "@/types";
// import { Form } from "semantic-ui-react";

const User = () => {
  const params = useParams();
  const [getUserPost, result] = useLazyQuery(GET_USER_POST, {
    variables: {
      username: params.username,
    },
  });

  useEffect(() => {
    getUserPost();
    // console.log(`result.data`, result.data);
    // if (result.data !== undefined) {

    // }
  }, [params.username]);

  return (
    <Container>
      {result.data && <Post posts={result.data.getPostsByUser} />}
    </Container>
  );
};

export default User;
