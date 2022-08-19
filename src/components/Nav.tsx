import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
// import { Menu } from "semantic-ui-react";

import { userLogoutAction } from "@/reducer/userReducer";
import { RootState, userState } from "@/types";

const Nav = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentPath: window.location.pathname.substring(1),
  });

  const user = useSelector<RootState, userState>((state) => state.user);

  useEffect(() => {
    setState({
      ...state,
      currentPath: window.location.pathname.substring(1),
    });
  }, [window.location.pathname, user]);

  const handleLogout = () => {
    dispatch(userLogoutAction());
    localStorage.setItem("loginUser", "");
    localStorage.setItem("jwtToken", "");
    // navigate("/");
  };

  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RC
          </Typography>
          <Button color="inherit">LOGIN</Button>
        </Toolbar>
      </AppBar>
      {/* </Box> */}
      {/* <Menu stackable size="massive">
        {user ? (
          <Menu.Item
            active={state.currentPath === `u/${user.username}`}
            as="a"
            href={`/u/${user.username}`}
          >
            {`u/${user.username}`}
          </Menu.Item>
        ) : (
          <Menu.Item active={state.currentPath === ""} as="a" href="/">
            Home
          </Menu.Item>
        )}
        <Menu.Item
          as="a"
          href="/create"
          active={state.currentPath === "create"}
        >
          Create new subreddit
        </Menu.Item>
        {!user && (
          <>
            <Menu.Item
              as="a"
              href="/login"
              active={state.currentPath === "login"}
            >
              login
            </Menu.Item>
            <Menu.Item
              as="a"
              href="/register"
              active={state.currentPath === "register"}
            >
              register
            </Menu.Item>
          </>
        )}{" "}
        {user && <Menu.Item onClick={handleLogout}>logout</Menu.Item>}
      </Menu> */}
    </>
  );
};

export default Nav;
