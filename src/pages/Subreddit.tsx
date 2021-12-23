import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Card, Icon } from "semantic-ui-react";

import { GET_SUBREDDIT_POST } from "@/queries";
import { showChamber } from "@/reducer/subredditReducer";
import { postType } from "@/types";

const Subreddit = () => {
  const params = useParams();
  const [getSubredditPost, result] = useLazyQuery(GET_SUBREDDIT_POST);
  const dispatch = useDispatch();
  const subredditPosts = useSelector((state) => state.subreddit);

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

  const extra = (
    <a>
      <Icon name="user" />
      16 Friends
    </a>
  );

  const CardExampleCardProps = () => (
    <Card
      header="Elliot Baker"
      meta="Friend"
      description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
      extra={extra}
    />
  );

  return (
    <div>
      Single Subreddit name: {params.subredditName}
      {/* {CardExampleCardProps()} */}
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
