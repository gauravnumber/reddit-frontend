import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_POSTS } from "@/queries";

const ViewPost = () => {
  // const [post, setPost] = useState();
  const { postId } = useParams();

  const { data: post } = useQuery(GET_SINGLE_POSTS, {
    variables: {
      postId,
    },
  });

  // useEffect(() => {
  //   if (result.data) {
  //     setPost(result.data.getSinglePosts);
  //     console.log(`result.data`, result.data);
  //   }
  //   // setPost(result.data ?? { ...result.data?.getSinglePosts });
  // }, [result.data]);

  console.log(`post`, post);
  return <div>viewpost {postId}</div>;
};

export default ViewPost;
