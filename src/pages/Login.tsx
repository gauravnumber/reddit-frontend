import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { userStoreAction } from "../reducer/userReducer";
import { LOGIN } from "../queries";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [login, { loading, error, data }] = useMutation(LOGIN, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const state = useSelector((state) => state);

  useEffect(() => {
    // console.log(`data`, data);

    if (data !== undefined) {
      dispatch(userStoreAction(data.login));
      localStorage.setItem("jwtToken", data.login.token);
      // console.log(`data.login.token`, data.login.token);
    }
  }, [data]);

  // console.log(`state`, state);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      variables: {
        username,
        password,
      },
    });

    setUsername("");
    setPassword("");
    // console.log(`username`, username);
    // console.log(`password`, password);
  };

  return (
    <Container>
      <h1>Login form</h1>
      <Form onSubmit={handleLogin}>
        <Form.Input
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="ui button">login</button>
        {/* <Button>submit</Button> */}
      </Form>
      {/* <form onSubmit={handleLogin}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="login" />
      </form> */}
    </Container>
  );
};

export default Login;
