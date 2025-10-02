import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, updateUser, deleteUser } from '../store/usersSlice';
import { Link } from 'react-router-dom';

function UsersList({ localUsers = [] }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [search, setSearch] = useState('');

  // Fetch users nga API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => dispatch(setUsers(data)));
  }, [dispatch]);

  // Kombinimi i users nga Redux + users lokal
  const combinedUsers = [...localUsers, ...users];

  const filteredUsers = combinedUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = id => {
    // Vetëm për API users (Redux)
    if (id < 1000000) dispatch(deleteUser(id));
  };

  const handleUpdate = user => {
    // Vetëm për API users (Redux)
    if (user.id < 1000000) {
      const newName = prompt('Enter new name', user.name);
      if (newName) dispatch(updateUser({ ...user, name: newName }));
    } else {
      alert('Cannot update local users');
    }
  };

  return (
    <div>
      <input
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Link to="/add-user">Add User</Link>
      <ul>
        {filteredUsers.map(u => (
          <li key={u.id}>
            {u.name} ({u.email})  
            {u.id < 1000000 && ( // butonat Update/Delete vetëm për users Redux
              <>
                <button onClick={() => handleUpdate(u)}>Update</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </>
            )}
            <Link to={`/users/${u.id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
