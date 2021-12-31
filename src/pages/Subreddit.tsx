import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Segment, Card, Icon, Form } from "semantic-ui-react";

import Post from "@/components/Post";
import PostingForm from "@/components/PostingForm";

import { POST, GET_SUBREDDIT_POST } from "@/queries";
import { showChamber } from "@/reducer/subredditReducer";
import { postType } from "@/types";
import { sortAction } from "@/reducer/sortReducer";

const Subreddit = () => {
  // const [sort, setSort] = useState("hot");
  // const [subredditPosts, setSubredditPosts] = useState(null);
  const refreshSubredditPost = useSelector((state) => state.refresh);
  const sort = useSelector((state) => state.sort);
  // console.log(`refreshSubredditPost`, refreshSubredditPost);
  const params = useParams();

  // const subredditPosts = useSelector((state) => state.subreddit);
  const dispatch = useDispatch();

  // const result = useQuery(GET_SUBREDDIT_POST, {
  //   variables: {
  //     name: params.subredditName,
  //   },
  // });
  // console.log(`params.subredditName`, params.subredditName);

  const [getSubredditPost, result] = useLazyQuery(GET_SUBREDDIT_POST, {
    variables: {
      // name: "funny",
      name: params.subredditName,
      sort: sort ?? "hot",
    },
    // update: (_,__) => {
    //   console.log(`_`, _)
    // }
    // },
  });

  // console.log(`params.subredditName`, params.subredditName);

  // const [posting, postingResult] = useMutation(POST, {
  //   refetchQueries: [GET_SUBREDDIT_POST],
  //   update: (cache, { data }) => {
  //     // const dataInCache = cache.readQuery({
  //     //   query: GET_SUBREDDIT_POST,
  //     //   // variables: {
  //     //   //   name: "funny",
  //     //   // },
  //     // });
  //     // console.log(`dataInCache`, dataInCache);
  //     // console.log(`data update`, data);
  //   },
  // });

  // const [post, setPost] = useState("");

  useEffect(() => {
    getSubredditPost();
  }, [sort, params.subredditName, refreshSubredditPost]);

  // useEffect(() => {

  // },[sort])
  // console.log(`subredditPosts`, subredditPosts);
  // useCallback(() => {
  //   getSubredditPost({
  //     variables: {
  //       name: params.subredditName,
  //     },
  //   });
  // }, [params.subredditName]);

  // useEffect(() => {
  //   console.log("enter in useEffect");

  //   // getSubredditPost();

  //   if (result.data !== undefined) {
  //     console.log(`result.data.getSubredditPost`, result.data.getSubredditPost);

  //     // setSubredditPosts(result.data);
  //     // dispatch(showChamber(result.data.getSubredditPost));
  //   }

  //   console.log(`params.subredditName`, params.subredditName);
  //   console.log(`result.data`, result.data);
  // }, [params.subredditName]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  // const handlePost = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   posting({
  //     variables: {
  //       title: `title: ${Math.floor(Math.random() * 20)}`,
  //       body: post,
  //       subredditName: params.subredditName,
  //       // body: `body: ${Math.floor(Math.random() * 10)}`,
  //     },
  //   });

  //   //! not setting post = ""
  //   // setPost("");
  //   // console.log(post);
  // };

  // console.log(`subredditPosts`, subredditPosts);
  // console.log(`result.data.subredditPosts`, result.data.subredditPosts);
  result.refetch();
  // console.log(`result.data`, result.data);
  // const handleSort = (sort: string) => (): void => {
  //   // console.log(sort, "sort");
  //   setSort(sort);
  //   dispatch(sortAction(sort));
  // };

  return (
    <Grid>
      <Grid.Row>
        {/* <Header as="h1">Write somebody.</Header> */}
        {/* <Form size="large" onSubmit={handlePost}>
          <Form.Input
            label="Write some body."
            onChange={(e) => setPost(e.target.value)}
            autoFocus
          />
        </Form> */}
        <PostingForm subredditName={params.subredditName} />
      </Grid.Row>
      <Grid.Row stretched>
        {result.data && (
          <>
            {/* <Card fluid>
              <Card.Content>
                <div className="ui buttons">
                  <button className="ui button" onClick={handleSort("hot")}>
                    New
                  </button>
                  <button className="ui button" onClick={handleSort("top:day")}>
                    Top: Day
                  </button>
                  <button
                    className="ui button"
                    onClick={handleSort("top:week")}
                  >
                    Top: Week
                  </button>
                  <button
                    className="ui button"
                    onClick={handleSort("top:month")}
                  >
                    Top: Month
                  </button>
                  <button
                    className="ui button"
                    onClick={handleSort("top:alltime")}
                  >
                    Top: All time
                  </button>
                </div>
              </Card.Content>
            </Card> */}

            <Post posts={result.data.getSubredditPost} />
          </>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Subreddit;
