import { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon, Popup, Comment } from "semantic-ui-react";

import { useMutation } from "@apollo/client";
import { commentType } from "@/types";
import { GET_SINGLE_POSTS, SET_COMMENT_ON_COMMENT } from "@/queries";

const NestedComments = ({ comments }: { comments: commentType[] }) => {
  const { postId } = useParams();
  const [commentOnComment, setCommentOnComment] = useState("");
  // const [popupReply, setPopupReply] = useState(false);

  const [commentOnCommenting, resultCommentOnComment] = useMutation(
    SET_COMMENT_ON_COMMENT,
    {
      update: (cache, { data }) => {
        // const dataInCache = cache.readQuery({
        //   query: GET_SINGLE_POSTS,
        //   variables: {
        //     postId,
        //   },
        // });
        // console.log(`dataInStore`, dataInCache);

        // cache.writeQuery({
        //   query: GET_SINGLE_POSTS,
        //   variables: {
        //     postId,
        //   },
        //   data: {
        //     ...dataInCache,
        //   },
        // });

        cache.updateQuery(
          {
            query: GET_SINGLE_POSTS,
            variables: {
              postId,
            },
          },
          (data) => ({
            getSinglePost: data,
            // getSinglePost: data.getSinglePost.comment.forEach(
            //   (comment: commentType) => console.log(comment)
            // ),
          })
        );
        console.log(`data commentOnComment`, data);
        // setPopupReply(false);
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
    <Comment.Group size="large" threaded>
      {comments.map((comment: commentType) => {
        // setPopupReply(false);

        return (
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
                <Popup
                  on="click"
                  trigger={
                    <button
                    //  onClick={() => setPopupReply(!popupReply)}
                    >
                      reply
                    </button>
                  }
                  // open={popupReply}
                >
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
        );
      })}
    </Comment.Group>
  );
};

export default NestedComments;
