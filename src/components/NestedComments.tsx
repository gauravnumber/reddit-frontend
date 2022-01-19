import { useState } from "react";
import { Icon, Popup, Comment } from "semantic-ui-react";

import { useMutation } from "@apollo/client";
import { commentType } from "@/types";
import { SET_COMMENT_ON_COMMENT } from "@/queries";

const NestedComments = ({ comments }: { comments: commentType[] }) => {
  const [commentOnComment, setCommentOnComment] = useState("");

  const [commentOnCommenting, resultCommentOnComment] = useMutation(
    SET_COMMENT_ON_COMMENT,
    {
      update: (cache, { data }) => {
        console.log(`data commentOnComment`, data);
      },
    }
  );

  if (!comments) return null;

  const replyOnComment = (e: React.FormEvent, comment: commentType) => {
    e.preventDefault();

    commentOnCommenting({
      variables: {
        commentId: comment._id,
        body: commentOnComment,
      },
    });
  };

  return (
    <Comment.Group size="large">
      {comments.map((comment: commentType) => (
        <Comment key={comment._id}>
          <Comment.Author as="a" href={`/u/${comment.owner.username}`}>
            u/{comment.owner.username}
          </Comment.Author>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>
              <Icon name="arrow up" />
            </Comment.Action>
            <Comment.Action>{comment.totalNumOfVotes}</Comment.Action>
            <Comment.Action>
              <Icon name="arrow down" />
            </Comment.Action>

            <Comment.Action>
              <Popup on="click" trigger={<button>reply</button>}>
                <form
                  className="ui form"
                  onSubmit={(e) => replyOnComment(e, comment)}
                >
                  <div className="fields">
                    <input
                      type="text"
                      onChange={(e) => setCommentOnComment(e.target.value)}
                    />
                    <input type="submit" value="Comment" />
                  </div>
                </form>
              </Popup>
            </Comment.Action>
          </Comment.Actions>

          <Comment.Content>
            <NestedComments comments={comment.comment} />
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
};

export default NestedComments;
