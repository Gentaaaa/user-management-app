import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser, deleteUser, setUsers } from '../store/usersSlice';
import { Link } from 'react-router-dom';

function UsersList({ localUsers = [] }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users ?? []); // Siguron array

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [asc, setAsc] = useState(true);

  // Fetch users only once
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        // Heq duplicates bazuar në id
        const allFetched = data.filter(fu => !users.some(u => u.id === fu.id));
        if (allFetched.length) dispatch(setUsers([...users, ...allFetched]));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bashkon localUsers me users nga store, pa duplicates
  const allUsers = [...users];
  localUsers.forEach(lu => {
    if (!allUsers.some(u => u.id === lu.id)) allUsers.push(lu);
  });

  // Filtron dhe sorton
  const filteredUsers = allUsers
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aKey = sortKey === 'company' ? a.company?.name || '' : a[sortKey] || '';
      let bKey = sortKey === 'company' ? b.company?.name || '' : b[sortKey] || '';
      if (aKey < bKey) return asc ? -1 : 1;
      if (aKey > bKey) return asc ? 1 : -1;
      return 0;
    });

  const handleDelete = id => dispatch(deleteUser(id));
  const handleUpdate = user => {
    const newName = prompt('Enter new name', user.name);
    const newEmail = prompt('Enter new email', user.email);
    if (newName && newEmail) {
      dispatch(updateUser({ ...user, name: newName, email: newEmail }));
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-2">
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </select>

          <button
            onClick={() => setAsc(!asc)}
            className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            {asc ? 'A → Z' : 'Z → A'}
          </button>

          <Link
            to="/add-user"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add User
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(u => (
          <div
            key={u.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-200"
            style={{ borderLeft: `5px solid hsl(${(u.id * 50) % 360}, 70%, 50%)` }} // ngjyra unike
          >
            <h2 className="text-lg font-bold mb-1 text-gray-800">{u.name}</h2>
            <p className="text-gray-600 mb-1">{u.email}</p>
            <p className="text-gray-500 mb-2">{u.company?.name}</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleUpdate(u)}
                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <Link
                to={`/users/${u.id}`}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
