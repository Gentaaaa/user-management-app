import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, updateUser, deleteUser } from "../store/usersSlice";
import { Link } from "react-router-dom";
import { User, Mail, Building2, Trash2, Edit, Info, Plus, ArrowUpDown } from "lucide-react";

function UsersList({ localUsers }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => dispatch(setUsers(data)));
  }, [dispatch]);

  const allUsers = [...localUsers, ...users];

  const filteredUsers = allUsers
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const handleDelete = (id) => dispatch(deleteUser(id));
  const handleUpdate = (user) => {
    const newName = prompt("Enter new name", user.name);
    if (newName) dispatch(updateUser({ ...user, name: newName }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <input
          className="border border-gray-300 p-3 rounded-xl w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow transition"
            onClick={() => setSortAsc(!sortAsc)}
          >
            <ArrowUpDown size={18} />
            Sort {sortAsc ? "A-Z" : "Z-A"}
          </button>
          <Link
            to="/add-user"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white px-4 py-2 rounded-xl shadow transition"
          >
            <Plus size={18} /> Add User
          </Link>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <User size={20} className="text-blue-500" /> {u.name}
              </h2>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <Mail size={18} className="text-gray-400" /> {u.email}
              </p>
              {u.company?.name && (
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Building2 size={18} className="text-gray-400" /> {u.company.name}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex gap-2">
              <button
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm transition"
                onClick={() => handleUpdate(u)}
              >
                <Edit size={16} /> Update
              </button>
              <button
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                onClick={() => handleDelete(u.id)}
              >
                <Trash2 size={16} /> Delete
              </button>
              <Link
                to={`/users/${u.id}`}
                className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm transition"
              >
                <Info size={16} /> Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
