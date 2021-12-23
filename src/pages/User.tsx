import { useParams } from "react-router-dom";
// import { Form } from "semantic-ui-react";

const User = () => {
  const params = useParams();

  return <h1>u/{params.username} page not currently available.</h1>;
};

export default User;
