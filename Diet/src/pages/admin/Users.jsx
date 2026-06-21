import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users"
      );

      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`
      );

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      alert("User deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);

    setEditForm({
      name: user.name,
      email: user.email,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${editingUser.id}`,
        editForm
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? { ...user, ...editForm }
            : user
        )
      );

      setEditingUser(null);

      alert("User updated successfully");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-white">
        Loading users...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Users
      </h1>

      <div className="overflow-x-auto bg-white dark:bg-slate-800 dark:text-white shadow rounded-xl">

        <table className="w-full">

          <thead className="bg-gray-100 dark:bg-slate-700">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td className="p-4 text-gray-700 dark:text-white">
                  {user.id}
                </td>

                <td className="p-4 text-gray-700 dark:text-white">
                  {user.name}
                </td>

                <td className="p-4 text-gray-700 dark:text-white">
                  {user.email}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Edit Modal */}

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-96">

            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Edit User
            </h2>

            <input
              type="text"
              value={editForm.name}
              placeholder="Name"
              className="w-full border p-3 rounded mb-3 dark:bg-slate-700 dark:text-white"
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              value={editForm.email}
              placeholder="Email"
              className="w-full border p-3 rounded mb-4 dark:bg-slate-700 dark:text-white"
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setEditingUser(null)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Users;