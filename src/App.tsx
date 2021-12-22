import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import Users from "./pages/Users";
import Chamber from "./pages/Chamber";
import Chambers from "./pages/Chambers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/u" element={<Users />}>
          <Route
            index
            element={<h1>Buddy!, You need to choose username.</h1>}
          />
          <Route path=":username" element={<User />} />
        </Route>
        <Route path="/c" element={<Chambers />}>
          <Route path=":chamberName" element={<Chamber />} />
        </Route>
        <Route path="*" element={<h1>You may be mistype.</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
