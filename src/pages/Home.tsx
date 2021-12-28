import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>home it is</h1>
      {/* <p></p> */}
      <ul>
        <li>
          <Link to="/r/funny">r/funny</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
