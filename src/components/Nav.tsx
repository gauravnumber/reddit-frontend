import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Message, Grid, Menu, SemanticCOLORS } from "semantic-ui-react";

import { userLogoutAction } from "@/reducer/userReducer";
import { notificationState, RootState, userState } from "@/types";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentPath: window.location.pathname.substring(1),
  });

  const user = useSelector<RootState, userState>((state) => state.user);
  // const notification = useSelector<RootState, notificationState>(
  //   (state) => state.notification
  // );

  useEffect(() => {
    setState({
      ...state,
      currentPath: window.location.pathname.substring(1),
    });

    // console.log(`state.currentPath`, state.currentPath);
  }, [window.location.pathname, user]);

  const handleLogout = () => {
    dispatch(userLogoutAction());
    localStorage.setItem("loginUser", "");
    localStorage.setItem("jwtToken", "");
    navigate("/");
  };

  // console.log(`notification`, notification);

  return (
    <>
      {/* {notification && (
        <Message
          content={notification.message}
          color={notification.messageColor as SemanticCOLORS}
          //  onDismiss={true}
        />
      )} */}
      <Menu stackable size="massive">
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
        {/* <Menu.Item
          as="a"
          href={`/${state.currentPath ? state.currentPath : "r/funny"}`}
        >
          {state.currentPath ? state.currentPath : "r/funny"}
        </Menu.Item> */}
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
        {/* {!user && <Menu.Item onClick={handleLogout}>logout</Menu.Item>} */}
      </Menu>
    </>
  );
};

export default Nav;
