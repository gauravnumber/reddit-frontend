import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SemanticCOLORS, Message, Card } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import VoteButton from "@/components/VoteButton";

import { sortAction } from "@/reducer/sortReducer";
import { refreshAction } from "@/reducer/refreshReducer";
import { DELETE_POST } from "@/queries";
import { notificationState, postType, RootState } from "@/types";

const Post = ({ posts }: { posts: postType[] }): JSX.Element | null => {
  const [loginWarning, setLoginWarning] = useState(false);
  const dispatch = useDispatch();

  const notification = useSelector<RootState, notificationState>(
    (state) => state.notification
  );

  const [deletePost, result] = useMutation(DELETE_POST, {
    update: (cache, { data }) => {
      console.log(`data`, data);
      dispatch(refreshAction("updateSubreddit"));
    },
  });

  if (!posts) return null;

  useEffect(() => {
    if (notification) {
      setLoginWarning(true);
    }
  }, [notification]);

  const handleDelete = (post: postType) => (): void => {
    deletePost({
      variables: {
        username: post.owner.username,
        subredditName: post.subreddit.name,
        postId: post._id,
      },
    });
  };

  const handleSort = (sort: string) => (): void => {
    dispatch(sortAction(sort));
  };

  const sortButtons = () => (
    <Card fluid>
      <Card.Content>
        <div className="ui buttons vertical fluid">
          <button className="ui button" onClick={handleSort("hot")}>
            New
          </button>
          <button className="ui button" onClick={handleSort("top:day")}>
            Top: Day
          </button>
          <button className="ui button" onClick={handleSort("top:week")}>
            Top: Week
          </button>
          <button className="ui button" onClick={handleSort("top:month")}>
            Top: Month
          </button>
          <button className="ui button" onClick={handleSort("top:alltime")}>
            Top: All time
          </button>
        </div>
      </Card.Content>
    </Card>
  );

  return (
    <Card.Group>
      {sortButtons()}
      {/* <Message content="lorem lorem" /> */}
      {loginWarning && (
        <Card fluid>
          <Card.Content>
            <Message
              content={notification?.message}
              color={notification?.messageColor as SemanticCOLORS}
              onDismiss={() => setLoginWarning(false)}
            />
          </Card.Content>
        </Card>
      )}
      {posts.map((post: postType, index: number) => {
        if (!post) return;
        return (
          <Card key={post._id} fluid>
            <Card.Content>
              {post.subreddit && (
                <Card.Meta as="a" href={`/r/${post.subreddit.name}`}>
                  r/{post.subreddit.name}
                </Card.Meta>
              )}

              <Card.Header>{post.title}</Card.Header>
              <Card.Meta as="a" href={`/u/${post.owner.username}`}>
                u/{post.owner.username}
              </Card.Meta>
              <button
                className="ui button teal right floated"
                onClick={handleDelete(post)}
              >
                delete
              </button>
              <Card.Description>{post.body}</Card.Description>
            </Card.Content>
            {/* Card.Content inside in <VoteButton />  */}
            <VoteButton post={post} />
          </Card>
        );
      })}
    </Card.Group>
  );
};

export default Post;
