import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SemanticCOLORS, Message, Card } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import VoteButton from "@/components/VoteButton";

import { sortAction } from "@/reducer/sortReducer";
import { refreshAction } from "@/reducer/refreshReducer";
import { DELETE_POST } from "@/queries";
import { notificationState, postType, RootState, userState } from "@/types";
import { loginAction } from "@/reducer/notificationReducer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Post = ({ posts }: { posts: postType[] }): JSX.Element | null => {
  // const [deletePostId, setDeletePostId] = useState("");
  const [loginWarning, setLoginWarning] = useState(false);
  const dispatch = useDispatch();

  const notification = useSelector<RootState, notificationState>(
    (state) => state.notification
  );

  const user = useSelector<RootState, userState>((state) => state.user);

  dayjs.extend(relativeTime);

  const [deletePost, result] = useMutation(DELETE_POST, {
    update: (cache, { data }) => {
      // let dataInCache = cache.readQuery({
      //   query: GET_SUBREDDIT_POST,

      //   variables: {
      //     name: "funny",
      //     sort: "hot",
      //   },
      // });

      // cache.writeQuery({
      //   query: GET_SUBREDDIT_POST,

      //   variables: {
      //     name: "funny",
      //     sort: "hot",
      //   },

      //   data: {
      //     dataInCache: {
      //       getSubredditPost: dataInCache.getSubredditPost.filter(
      //         (post) => post._id !== deletePostId
      //       ),
      //     },
      //   },
      // });

      // console.log(`dataInCache`, dataInCache);
      // console.log(`data`, data);
      dispatch(refreshAction("updateSubreddit"));
    },
    onError: (error) => {
      dispatch(
        loginAction({
          message: error.graphQLErrors[0].message,
          messageColor: "orange",
        })
      );

      // setTimeout(() => {
      //   setLoginWarning(false);
      //   // nullAction();
      // }, 1000);

      //? clear error message for login first
      // setTimeout(() => nullAction(), 5000);

      // console.log(JSON.stringify(error));
    },
  });

  if (!posts) return null;

  // console.log(`deletePostId`, deletePostId);

  useEffect(() => {
    if (notification) {
      setLoginWarning(true);
      setTimeout(() => {
        setLoginWarning(false);
        // nullAction();
      }, 5000);
    }
  }, [notification]);

  const handleDelete = (post: postType) => (): void => {
    // setDeletePostId(post._id);

    deletePost({
      variables: {
        username: post.owner.username,
        subredditName: post.subreddit.name,
        postId: post._id,
      },
    });

    // console.log(`post._id`, post._id);
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

  // console.log(`dayjs()`, dayjs(1640704399243).fromNow());

  return (
    <Card.Group>
      {sortButtons()}
      {loginWarning && (
        <Card fluid>
          <Card.Content>
            <Message
              content={notification?.message}
              color={notification?.messageColor as SemanticCOLORS}
              onDismiss={() => {
                setLoginWarning(false);
                // setTimeout(() => nullAction(), 5000);
              }}
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
              <Card.Header
                as="a"
                href={`/r/${post.subreddit.name}/post/${post._id}`}
              >
                {post.title}
              </Card.Header>
              <Card.Meta as="a" href={`/u/${post.owner.username}`}>
                u/{post.owner.username}
              </Card.Meta>
              <Card.Meta>{dayjs(parseInt(post.createdAt)).fromNow()}</Card.Meta>
              {/* {user?.username} */}
              {post.owner.username === user?.username && (
                <button
                  className="ui button teal right floated"
                  onClick={handleDelete(post)}
                >
                  delete
                </button>
              )}{" "}
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
