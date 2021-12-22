import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    console.log(`data`, data);

    if (data?.login !== undefined) {
      dispatch(userStoreAction(data.login));
    }
  }, [data]);

  console.log(`state`, state);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <div>
      <h1>Login form</h1>
      <form onSubmit={handleLogin}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="login" />
      </form>
    </div>
  );
};

export default Login;
