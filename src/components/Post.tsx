import { useSelector, useDispatch } from "react-redux";
import { Segment, Button, Card } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import VoteButton from "@/components/VoteButton";

import { sortAction } from "@/reducer/sortReducer";
import { refreshAction } from "@/reducer/refreshReducer";
import { DELETE_POST } from "@/queries";
import { postType } from "@/types";

const Post = ({ posts }: { posts: postType[] }): JSX.Element | undefined => {
  const state = useSelector((state) => state.sort);
  // console.log(`state`, state);
  const dispatch = useDispatch();

  const [deletePost, result] = useMutation(DELETE_POST, {
    update: (cache, { data }) => {
      console.log(`data`, data);
      dispatch(refreshAction("updateSubreddit"));
    },
  });
  if (!posts) return;

  const handleDelete = (post: { post: postType }) => (): void => {
    // console.log("delete", post);
    // console.log(`post._id`, post._id);
    // console.log(`post.owner.username`, post.owner.username);
    // console.log(`post.subreddit.name`, post.subreddit.name);

    deletePost({
      variables: {
        username: post.owner.username,
        subredditName: post.subreddit.name,
        postId: post._id,
      },
    });
  };

  const handleSort = (sort: string) => (): void => {
    // console.log(sort, "sort");
    dispatch(sortAction(sort));
  };

  return (
    <Card.Group stackable>
      <Card fluid>
        <Card.Content>
          <div className="ui buttons">
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
              {/* <button className="ui button teal right floated">delete</button> */}
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
