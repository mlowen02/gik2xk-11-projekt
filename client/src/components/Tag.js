import { Link } from "react-router-dom";

function Tag({ tagName }) {
  return (
    <>
      <Link to={`/tag/${tagName}/posts`}>{tagName}</Link>
    </>
  );
}

export default Tag;
