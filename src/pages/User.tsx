import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

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
      {result.data &&
        result.data.getPostsByUser.map((post: postType, index: number) => (
          <Card key={index}>
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Meta>u/{post.owner.username}</Card.Meta>
              <Card.Description>{post.body}</Card.Description>
            </Card.Content>
          </Card>
          // <Card
          //   key={index}
          //   header={post.title}
          //   meta={`u/${post.owner.username}`}
          //   description={post.body}
          //   // extra={extra}
          // />
        ))}
    </Container>
  );
  // return <h1>u/{params.username} page not currently available.</h1>;
};

export default User;
