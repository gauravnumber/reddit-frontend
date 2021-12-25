import { Button, Card } from "semantic-ui-react";

import VoteButton from "@components/VoteButton";

import { postType } from "@/types";

const Post = ({ posts }: { posts: postType[] }) => {
  return (
    <Card.Group>
      {posts.map((post: postType, index: number) => (
        <Card key={index}>
          <Card.Content>
            <Card.Header>{post.title}</Card.Header>
            <Card.Meta as="a" href={`/u/${post.owner.username}`}>
              u/{post.owner.username}
            </Card.Meta>
            <Card.Description>{post.body}</Card.Description>
          </Card.Content>
          {/* Card.Content inside in <VoteButton />  */}
          <VoteButton _id={post._id} totalNumOfVote={post.totalNumOfVote} />
        </Card>
      ))}
    </Card.Group>
  );
};

export default Post;
