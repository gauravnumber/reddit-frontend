import { Segment, Button, Card } from "semantic-ui-react";

import VoteButton from "@/components/VoteButton";

import { postType } from "@/types";

const Post = ({ posts }: { posts: postType[] }) => {
  // console.log(`posts`, posts);
  //
  if (!posts) return;

  return (
    <Card.Group stackable>
      {posts.map((post: postType, index: number) => {
        if (!post) return;
        return (
          <Card key={index} fluid>
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Meta as="a" href={`/u/${post.owner.username}`}>
                u/{post.owner.username}
              </Card.Meta>
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
