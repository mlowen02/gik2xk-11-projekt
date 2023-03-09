import { Link } from "react-router-dom";

function UserItemSmall({ user }) {
  return user ? (
    <>
      <img alt="Profilbild" height="50" width="50" src={user.imageUrl} />
      <Link to={`/users/${user.id}/posts`}>{user.username}</Link>
    </>
  ) : (
    <>User missing</>
  );
}

export default UserItemSmall;
