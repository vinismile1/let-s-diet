import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    console.log("ID coming from UI:", id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);

      setUsers((prev) => prev.filter((user) => user.id !== id));

    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email
    });
  };

 const handleUpdate = async () => {
  console.log("EDIT DATA:", editForm);

  await axios.put(
    `http://localhost:5000/api/admin/users/${editingUser.id}`,
    editForm
  );

  setUsers((prev) =>
    prev.map((u) =>
      u.id === editingUser.id ? { ...u, ...editForm } : u
    )
  );

  setEditingUser(null);
};

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Users</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{user.id}</td>
                <td className="p-3 border-b">{user.name}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition ml-2"
                  >
                    Edit
                  </button>
                  {editingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

                      <div className="bg-white p-6 rounded w-96">

                        <h2 className="text-xl font-bold mb-4">Edit User</h2>

                        <input
                          className="border p-2 w-full mb-3"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          placeholder="Name"
                        />

                        <input
                          className="border p-2 w-full mb-3"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          placeholder="Email"
                        />

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => setEditingUser(null)}
                            className="px-3 py-1 bg-red-400 text-white rounded"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={handleUpdate}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Update
                          </button>

                        </div>

                      </div>

                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};



export default Users;