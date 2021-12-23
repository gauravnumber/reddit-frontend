import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";

const Users = () => {
  return (
    <Container>
      {/* lot of users */}
      <Outlet />
    </Container>
  );
};

export default Users;
