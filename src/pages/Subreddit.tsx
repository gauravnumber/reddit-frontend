import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Card, Icon, Form } from "semantic-ui-react";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { showChamber } from "@/reducer/subredditReducer";
import { postType } from "@/types";

const Subreddit = () => {
  const params = useParams();

  const subredditPosts = useSelector((state) => state.subreddit);
  const dispatch = useDispatch();

  const [getSubredditPost, result] = useLazyQuery(GET_SUBREDDIT_POST);
  const [posting, postingResult] = useMutation(POST);

  const [post, setPost] = useState("");

  console.log(`subredditPosts`, subredditPosts);

  useEffect(() => {
    getSubredditPost({
      variables: {
        name: params.subredditName,
      },
    });

    if (result.data !== undefined) {
      dispatch(showChamber(result.data.getSubredditPost));
    }
  }, [params.subredditName, result.data]);

  // const extra = (
  //   <a>
  //     <Icon name="user" />
  //     16 Friends
  //   </a>
  // );

  // const CardExampleCardProps = () => (
  //   <Card
  //     header="Elliot Baker"
  //     meta="Friend"
  //     description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
  //     extra={extra}
  //   />
  // );

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();

    posting({
      variables: {
        title: `title: ${Math.floor(Math.random() * 10)}`,
        body: post,
        subredditName: params.subredditName,
        // body: `body: ${Math.floor(Math.random() * 10)}`,
      },
    });
  };

  return (
    <div>
      Single Subreddit name: {params.subredditName}
      {/* {CardExampleCardProps()} */}
      <form onSubmit={handlePost}>
        <input
          type="text"
          autoFocus
          onChange={(e) => setPost(e.target.value)}
        />
        <input type="submit" value="post" />
      </form>
      {/* <Form>
        <Form.Field />
      </Form> */}
      {subredditPosts &&
        subredditPosts.map((post: postType, index: number) => (
          <Card
            key={index}
            header={post.title}
            meta={`u/${post.owner.username}`}
            description={post.body}
            // extra={extra}
          />
        ))}
    </div>
  );
};

export default Subreddit;
