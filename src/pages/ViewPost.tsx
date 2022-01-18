import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Popup, Comment, Icon, Grid, Card, Feed } from "semantic-ui-react";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  SET_COMMENT_ON_POST,
  GET_SINGLE_POSTS,
  SET_COMMENT_ON_COMMENT,
} from "@/queries";
import { commentType } from "@/types";
import VoteButton from "@/components/VoteButton";

const ViewPost = () => {
  const [comment, setComment] = useState("");
  const [commentOnComment, setCommentOnComment] = useState("");

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
      console.log(`data comment on post`, data);
    },
  });

  const [commentOnCommenting, resultCommentOnComment] = useMutation(
    SET_COMMENT_ON_COMMENT,
    {
      update: (cache, { data }) => {
        console.log(`data commentOnComment`, data);
      },
    }
  );

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();

    commenting({
      variables: {
        postId,
        body: comment,
      },
    });

    getSinglePosts();
    // console.log(`comment`, comment);
  };

  // const replyOnComment = (comment: commentType) => {
  const replyOnComment = (e: React.FormEvent, comment: commentType) => {
    e.preventDefault();
    // console.log("commentOnComment", commentOnComment);
    commentOnCommenting({
      variables: {
        commentId: comment._id,
        body: commentOnComment,
      },
    });
  };

  useEffect(() => {
    // console.log(`postId`, postId);
    getSinglePosts({
      variables: {
        postId,
      },
    });
    // console.log("run");
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
          <Comment.Group size="huge">
            {result.data?.getSinglePost?.comment.map((comment: commentType) => (
              <Comment key={comment._id}>
                <Comment.Content>
                  <Comment.Author as="a" href={`/u/${comment.owner.username}`}>
                    u/{comment.owner.username}
                  </Comment.Author>
                  <Comment.Text>{comment.body}</Comment.Text>
                  {/* <Comment.Metadata> */}
                  <Comment.Actions>
                    <Comment.Action>
                      <Icon name="arrow up" />
                    </Comment.Action>
                    <Comment.Action>{comment.totalNumOfVotes}</Comment.Action>
                    <Comment.Action>
                      <Icon name="arrow down" />
                    </Comment.Action>

                    <Comment.Action>
                      <Popup
                        // content="reply comment"
                        on="click"
                        trigger={<button>reply</button>}
                      >
                        <form
                          className="ui form"
                          onSubmit={(e) => replyOnComment(e, comment)}
                        >
                          <div className="fields">
                            <input
                              type="text"
                              onChange={(e) =>
                                setCommentOnComment(e.target.value)
                              }
                            />
                            <input type="submit" value="Comment" />
                          </div>
                        </form>
                      </Popup>
                    </Comment.Action>
                  </Comment.Actions>
                  {/* </Comment.Metadata> */}
                </Comment.Content>
                <Comment.Content>
                  <Comment.Group size="large">
                    {comment.comment.map((c: commentType) => (
                      <Comment key={c._id}>
                        <Comment.Author as="a">
                          u/{c.owner.username}
                        </Comment.Author>
                        <Comment.Content>{c._id}</Comment.Content>
                      </Comment>
                    ))}
                  </Comment.Group>
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
