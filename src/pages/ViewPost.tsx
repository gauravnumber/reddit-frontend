import { useParams } from "react-router-dom";

const ViewPost = () => {
  const { postId } = useParams();

  return <div>viewpost {postId}</div>;
};

export default ViewPost;
