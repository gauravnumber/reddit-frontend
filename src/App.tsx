import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import Users from "./pages/Users";
import Subreddit from "@/pages/Subreddit";
import Subreddits from "@/pages/Subreddits";
import CreateSubreddit from "@/pages/CreateSubreddit";

import { userStoreAction } from "@/reducer/userReducer";

import { Container } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function App() {
  const [loginUser, setLoginUser] = useState();
  const dispatch = useDispatch();

  let user = localStorage.getItem("loginUser");
  user = JSON.parse(user);
  // console.log(`user`, user);

  useEffect(() => {
    // const user: string | null = localStorage.getItem("loginUser");
    // let user = localStorage.getItem("loginUser");
    // user = JSON.parse(user);

    dispatch(userStoreAction(user));
    // console.log("app");
    // setLoginUser(user);
  }, [loginUser]);

  // const user = localStorage.getItem("loginUser");
  // console.log(`JSON.parse(user)`, JSON.parse(user));

  return (
    <Container style={{ paddingTop: "2rem" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/u" element={<Users />}>
            {/* <Route
              index
              element={<h1>Buddy!, You need to choose username.</h1>}
            /> */}
            <Route path=":username" element={<User />} />
          </Route>
          <Route path="/r" element={<Subreddits />}>
            <Route path=":subredditName" element={<Subreddit />} />
          </Route>
          <Route path="/create" element={<CreateSubreddit />} />
          <Route path="*" element={<h1>You probably be mistype.</h1>} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
