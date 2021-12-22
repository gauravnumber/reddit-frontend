import { useParams } from "react-router-dom";

const User = () => {
  const params = useParams();

  return <div>unique user {params.username}</div>;
};

export default User;
