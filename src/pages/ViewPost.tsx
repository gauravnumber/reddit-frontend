import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, Feed } from "semantic-ui-react";

import { useQuery } from "@apollo/client";
import { GET_SINGLE_POSTS } from "@/queries";
import { resultKeyNameFromField } from ".pnpm/apollo-utilities@1.3.4_graphql@16.2.0/node_modules/apollo-utilities";

const ViewPost = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();

  // const { data: post } = useQuery(GET_SINGLE_POSTS, {
  const result = useQuery(GET_SINGLE_POSTS, {
    variables: {
      postId,
    },
  });

  // useEffect(() => {
  //   if (result.data) {
  //     setPost(result.data.getSinglePosts);
  //     console.log(`result.data`, result.data);
  //   }
  //   // setPost(result.data ?? { ...result.data?.getSinglePosts });
  // }, [result.data]);

  // console.log(`post`, post);
  console.log(`result.data`, result.data);

  return (
    <Grid>
      {/* viewpost {postId} */}
      <Grid.Row>
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>{result.data?.getSinglePost?.title}</Card.Header>
              <Card.Description>
                {result.data?.getSinglePost.body}
              </Card.Description>
            </Card.Content>
          </Card>
          {result.data?.getSinglePost?.comment.map((comment) => (
            <Feed key={comment._id}>
              <Feed.Content>
                <Feed.Summary>
                  {comment.body}
                  <Feed.User>username</Feed.User>
                  <Feed.Date>2 days ago</Feed.Date>
                </Feed.Summary>
              </Feed.Content>
            </Feed>
          ))}{" "}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ViewPost;
