import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Menu } from "semantic-ui-react";

const Nav = () => {
  const [state, setState] = useState({
    currentPath: window.location.pathname.substring(1),
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // setLocation(window.location.pathname.substring(1))
  }, []);

  return (
    <Menu size="massive">
      {user ? (
        <Menu.Item
          active={state.currentPath === `u/${user.username}`}
          as="a"
          href="/"
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
        href="/r/funny"
        active={state.currentPath === "r/funny"}
      >
        r/funny
      </Menu.Item>
      <Menu.Item as="a" href="/login" active={state.currentPath === "login"}>
        login
      </Menu.Item>
      <Menu.Item
        as="a"
        href="/register"
        active={state.currentPath === "register"}
      >
        register
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
