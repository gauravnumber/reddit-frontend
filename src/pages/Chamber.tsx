import { useParams } from "react-router-dom";

const Chamber = () => {
  const params = useParams();

  return <div>Single Chamber name: {params.chamberName}</div>;
};

export default Chamber;
