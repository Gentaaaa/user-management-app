import React, { useState } from 'react';
import UsersList from '../components/UsersList';
import AddUserForm from '../components/AddUserForm';
import UserDetails from '../components/UserDetails';
import { Routes, Route } from 'react-router-dom';

function Home() {
  const [localUsers, setLocalUsers] = useState([]);

  const addLocalUser = user => {
    setLocalUsers([user, ...localUsers]);
  };

  return (
    <Routes>
      {/* Faqja kryesore me listën e users */}
      <Route path="/" element={<UsersList localUsers={localUsers} />} />

      {/* Faqja për të shtuar user lokal */}
      <Route path="/add-user" element={<AddUserForm addLocalUser={addLocalUser} />} />

      {/* Faqja e detajeve për secilin user */}
      <Route path="/users/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default Home;
