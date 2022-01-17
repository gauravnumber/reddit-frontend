import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment, Icon, Grid, Card, Feed } from "semantic-ui-react";

import { useQuery } from "@apollo/client";
import { GET_SINGLE_POSTS } from "@/queries";
import { resultKeyNameFromField } from ".pnpm/apollo-utilities@1.3.4_graphql@16.2.0/node_modules/apollo-utilities";
import { commentType } from "@/types";
import VoteButton from "@/components/VoteButton";

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
  // console.log(`result.data`, result.data);
  // console.log(`result.data?.getSinglePost`, result.data?.getSinglePost);

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
            {result.data && <VoteButton post={result.data?.getSinglePost} />}
          </Card>
          <Comment.Group>
            {result.data?.getSinglePost?.comment.map((comment: commentType) => (
              <Comment key={comment._id}>
                <Comment.Content>
                  <Comment.Author as="a" href={`/u/${comment.owner.username}`}>
                    u/{comment.owner.username}
                  </Comment.Author>
                  <Comment.Text>{comment.body}</Comment.Text>
                  <Comment.Metadata>
                    <Icon name="arrow up" />
                    {comment.totalNumOfVotes} <Icon name="arrow down" />
                  </Comment.Metadata>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
          {/* {result.data?.getSinglePost?.comment.map((comment: commentType) => (
            <Feed key={comment._id}>
              <Feed.Content>
                <Feed.Summary>
                  username
                  <Feed.User>u/{comment.owner.username}</Feed.User>
                  <Feed.Date>2 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra>{comment.body}</Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="arrow up" />
                    {comment.totalNumOfVotes} <Icon name="arrow down" />
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed>
          ))}
           */}{" "}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ViewPost;
