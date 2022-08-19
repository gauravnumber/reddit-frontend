import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import Users from "./pages/Users";
import Subreddit from "@/pages/Subreddit";
import Subreddits from "@/pages/Subreddits";
import CreateSubreddit from "@/pages/CreateSubreddit";

import Nav from "@/components/Nav";
import PageNotFound from "@/components/PageNotFound";

import { userStoreAction } from "@/reducer/userReducer";

// import { Container } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { userState } from "./types";
import ViewPost from "./pages/ViewPost";

function App() {
  const [loginUser, setLoginUser] = useState();
  const dispatch = useDispatch();

  let user = localStorage.getItem("loginUser");
  user = user ? JSON.parse(user) : "";

  useEffect(() => {
    dispatch(userStoreAction(user as userState));
  }, [loginUser]);

  return (
    <>
      <CssBaseline />
      <Nav />
      <Container
        component="main"
        maxWidth="md"
        // style={{ paddingTop: "2rem" }}
      >
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
              <Route
                path=":subredditName/post/:postId"
                element={<ViewPost />}
              />
            </Route>
            <Route path="/create" element={<CreateSubreddit />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
