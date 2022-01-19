import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Popup, Comment, Icon, Grid, Card, Feed } from "semantic-ui-react";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SET_COMMENT_ON_POST, GET_SINGLE_POSTS } from "@/queries";
import VoteButton from "@/components/VoteButton";
import NestedComments from "@/components/NestedComments";

const ViewPost = () => {
  const [comment, setComment] = useState("");

  const { postId } = useParams();

  const [getSinglePosts, result] = useLazyQuery(GET_SINGLE_POSTS, {
    variables: {
      postId,
    },
  });

  const [commenting, resultComment] = useMutation(SET_COMMENT_ON_POST, {
    update: (cache, { data }) => {
      console.log(`data comment on post`, data);
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
  };

  useEffect(() => {
    getSinglePosts({
      variables: {
        postId,
      },
    });

    console.log(`result.data`, result.data);
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
          <NestedComments comments={result.data?.getSinglePost?.comment} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ViewPost;
