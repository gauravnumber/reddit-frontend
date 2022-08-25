import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
// import { Menu } from "semantic-ui-react";

import { userLogoutAction } from "@/reducer/userReducer";
import { RootState, userState } from "@/types";
import Login from "../pages/Login";

const Nav = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [state, setState] = useState({
  //   currentPath: window.location.pathname.substring(1),
  // });

  const user = useSelector<RootState, userState>((state) => state.user);

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     currentPath: window.location.pathname.substring(1),
  //   });
  // }, [window.location.pathname, user]);

  const handleLogout = () => {
    dispatch(userLogoutAction());
    localStorage.setItem("loginUser", "");
    localStorage.setItem("jwtToken", "");
    // navigate("/");
  };
  const shiftTabCanUse = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setToggleDrawer(false);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="list of common subreddit"
      onClick={() => setToggleDrawer(!toggleDrawer)}
      onKeyDown={shiftTabCanUse}
    >
      <List>
        {["Funny", "Awesome", "WTF", "Gaming"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/r/${text.toLowerCase()}`}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  // console.log(`user`, user);

  return (
    <>
      {/* <Routes path="/login" element={<Login />} /> */}

      <Drawer open={toggleDrawer} onClose={() => setToggleDrawer(false)}>
        {list()}
      </Drawer>
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setToggleDrawer(!toggleDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            // variant="h6" component="div"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              // color: "black",
              // backgroundColor: "primary.dark",
              color: (theme) => theme.palette.background.paper,
              "&:hover": {
                color: (theme) => theme.palette.background.paper,
              },
            }}
          >
            RC
          </Typography>
          {user ? (
            <>
              <Button color="inherit">u/{user.username}</Button>
              <Button
                color="inherit"
                component={Link}
                to="/create"
                sx={{
                  "&:hover": {
                    color: (theme) => theme.palette.background.paper,
                  },
                }}
              >
                Create Subreddit
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                LOGIN
              </Button>
              <Button color="inherit" component={Link} to="/register">
                SIGNUP
              </Button>
            </>
          )}
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
