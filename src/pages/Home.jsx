import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersList from '../components/UsersList';
import AddUserForm from '../components/AddUserForm';
import UserDetails from '../components/UserDetails';

function Home() {
  const [localUsers, setLocalUsers] = useState([]);

  const addLocalUser = (user) => {
    setLocalUsers([user, ...localUsers]);
  };

  const updateLocalUser = (updatedUser) => {
    setLocalUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<UsersList localUsers={localUsers} />}
      />
      <Route
        path="/add-user"
        element={<AddUserForm addLocalUser={addLocalUser} />}
      />
      <Route
        path="/users/:id"
        element={<UserDetails localUsers={localUsers} updateLocalUser={updateLocalUser} />}
      />
    </Routes>
  );
}

export default Home;
