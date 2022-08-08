import { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon, Popup, Comment } from "semantic-ui-react";

import { useMutation } from "@apollo/client";
import { commentType } from "@/types";
import {
  DOWNVOTE_COMMENT,
  GET_SINGLE_POSTS,
  SET_COMMENT_ON_COMMENT,
  UPVOTE_COMMENT,
} from "@/queries";

const NestedComments = ({ comments }: { comments: commentType[] }) => {
  const { postId } = useParams();
  const [commentOnComment, setCommentOnComment] = useState("");
  const [popupReply, setPopupReply] = useState({
    commentId: "",
    show: false,
  });

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
        setPopupReply({ commentId: "", show: false });
      },
    }
  );

  const [upvoteCommenting, resultUpvoteCommenting] = useMutation(
    UPVOTE_COMMENT,
    {
      update: (cache, { data }) => {
        console.log(`data`, data);
      },
    }
  );

  const [downvoteCommenting, resultDownvoteCommenting] = useMutation(
    DOWNVOTE_COMMENT,
    {
      update: (cache, { data }) => {
        console.log(`data`, data);
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

  const handleUpvoteComment = (commentId: string) => () => {
    upvoteCommenting({
      variables: {
        commentId,
      },
    });
  };

  const handleDownvoteComment = (commentId: string) => () => {
    downvoteCommenting({
      variables: {
        commentId,
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
                <Icon
                  name="arrow up"
                  // as="button"
                  onClick={handleUpvoteComment(comment._id)}
                />
              </Comment.Action>
              <Comment.Action>{comment.totalNumOfVotes}</Comment.Action>
              <Comment.Action>
                <Icon
                  name="arrow down"
                  onClick={handleDownvoteComment(comment._id)}
                />
              </Comment.Action>

              <Comment.Action>
                {/* <div
                  className="ui icon button"
                  data-content="lorem lorem"
                  data-content1={
                    <button
                      onClick={() =>
                        setPopupReply({
                          commentId: comment._id,
                          // show: true,
                          show: !popupReply.show,
                        })
                      }
                    >
                      reply
                    </button>
                  }
                > */}
                {/* <i className="add icon"></i> */}
                {/* <form
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
                  </form> */}
                {/* </div> */}
                <Popup
                  on="click"
                  trigger={
                    <button
                      onClick={() =>
                        setPopupReply({
                          commentId: comment._id,
                          // show: true,
                          show: !popupReply.show,
                        })
                      }
                    >
                      reply
                    </button>
                  }
                  open={popupReply.commentId === comment._id && popupReply.show}
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
