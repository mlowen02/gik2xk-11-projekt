import { useEffect, useState } from "react";
import { getAll } from "../models/UserModel";
import UserItemSmall from "./UserItemSmall";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((users) => {
      setUsers(users);
    });
  }, []);
  return (
    <ul>
      {users &&
        users.map((user) => {
          return (
            <li key={`userId_${user.id}`}>
              <UserItemSmall user={user} />
            </li>
          );
        })}
    </ul>
  );
}

export default UserList;
