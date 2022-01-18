import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment, Icon, Grid, Card, Feed } from "semantic-ui-react";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SET_COMMENT_ON_POST, GET_SINGLE_POSTS } from "@/queries";
import { commentType } from "@/types";
import VoteButton from "@/components/VoteButton";

const ViewPost = () => {
  const [comment, setComment] = useState("");
  const { postId } = useParams();

  const [getSinglePosts, result] = useLazyQuery(GET_SINGLE_POSTS, {
    variables: {
      postId,
    },
  });

  // console.log(`result.data`, result.data);
  // console.log(`postId`, postId);

  const [commenting, resultComment] = useMutation(SET_COMMENT_ON_POST, {
    update: (cache, { data }) => {
      console.log(`data`, data);
    },
  });

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();

    commenting({
      variables: {
        postId,
        body: comment,
      },
    });

    getSinglePosts();
    console.log(`comment`, comment);
  };

  useEffect(() => {
    // console.log(`postId`, postId);
    getSinglePosts({
      variables: {
        postId,
      },
    });
    // console.log("run");
    // console.log(`result.data`, result.data);
  }, [result.data]);

  return (
    <Grid>
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
            <Card.Content>
              <form className="ui form" onSubmit={handleComment}>
                <div className="fields">
                  <label htmlFor="commentOnPost">Comment on Post</label>
                  <input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <input type="submit" value="Comment" />
                </div>
              </form>
            </Card.Content>
          </Card>
          <Comment.Group size="huge">
            {result.data?.getSinglePost?.comment.map((comment: commentType) => (
              <Comment key={comment._id}>
                <Comment.Content>
                  <Comment.Author as="a" href={`/u/${comment.owner.username}`}>
                    u/{comment.owner.username}
                  </Comment.Author>
                  <Comment.Text>{comment.body}</Comment.Text>
                  <Comment.Metadata>
                    <Comment.Actions>
                      <Comment.Action>
                        {/* <Icon.Group size="huge"> */}
                        <Icon name="arrow up" />
                        {comment.totalNumOfVotes} <Icon name="arrow down" />
                        {/* </Icon.Group> */}
                      </Comment.Action>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Metadata>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ViewPost;
