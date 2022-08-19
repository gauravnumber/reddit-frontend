import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Message,
  Button,
  Form,
  Container,
  SemanticCOLORS,
} from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { userStoreAction } from "../reducer/userReducer";
import { LOGIN } from "../queries";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    message: "",
    messageStatus: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { loading, error, data }] = useMutation(LOGIN, {
    update: (_, { data }) => {
      localStorage.setItem("loginUser", JSON.stringify(data.login));
      localStorage.setItem("jwtToken", data.login.token);
      dispatch(userStoreAction(data.login));
      // console.log(`data`, data);
      navigate("/");
      // navigate("/r/funny");
    },
    onError: (err) => {
      // console.log(err.graphQLErrors[0].message);
      setState({
        ...state,
        message: err.graphQLErrors[0].message,
        messageStatus: "red",
      });
    },
  });

  // const state = useSelector((state) => state);

  useEffect(() => {
    // console.log(`data`, data);

    if (data !== undefined) {
      // dispatch(userStoreAction(data.login));
      // localStorage.setItem("jwtToken", data.login.token);
      // console.log(`JSON.stringify(data.login)`, JSON.stringify(data.login));
      // localStorage.setItem("loginUser", JSON.stringify(data.login));
      setState({
        ...state,
        message: "Account successfully login.",
        messageStatus: "green",
      });

      // console.log(`data.login`, data.login);
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

    // setUsername("");
    // setPassword("");
    setState({
      ...state,
      message: "",
      messageStatus: "",
    });

    // console.log(`data`, data);
    console.log(`username`, username);
    console.log(`password`, password);
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
        {state.message && (
          <Message
            content={state.message}
            color={state.messageStatus as SemanticCOLORS}
          />
        )}
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
