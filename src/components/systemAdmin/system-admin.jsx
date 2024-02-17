import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./system-admin.css";

//Import components
import EditDetails from "../editDetails/edit-details";

//Import logic
import { deleteUser, loadUsers } from "../../utils/storageHandler";

export default function SystemAdmin() {
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadArr();
  }, []);

  const loadArr = () => {
    const usersData = loadUsers();
    setUsers(usersData);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const handleDelete = async (user) => {
    await deleteUser(user);
    loadArr();
  };

  const handleUpdateUser = (updatedUser) => {
    // Find the index of the updated user in the users array
    const index = users.findIndex(
      (user) => user.username === updatedUser.username
    );
    // Update the users array with the updated user
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = updatedUser;
      return updatedUsers;
    });
    setShowEdit(false);
  };

  return (
    <>
      <div className="admin-dashboard">
        <h1>Dashboard</h1>
        {users.length !== 0 ? (
          <table>
            <tbody>
              <tr key={"col-names"}>
                <td>username</td>
                <td>full name</td>
                <td>birthday</td>
                <td>address</td>
                <td>email</td>
              </tr>

              {users.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{`${item.firstName} ${item.lastName}`}</td>{" "}
                  <td>{item.birthday}</td>
                  <td>{`${item.city} ${item.street} ${item.number}`}</td>
                  <td>{item.email}</td>
                  <td>
                    <MdEdit onClick={() => handleEdit(item)} />
                  </td>
                  <td>
                    <MdDelete onClick={() => handleDelete(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <h2>No registered users</h2>
          </div>
        )}
      </div>

      {showEdit && (
        <EditDetails
          userData={selectedUser}
          setShow={setShowEdit}
          setUpdate={handleUpdateUser}
        />
      )}
    </>
  );
}
