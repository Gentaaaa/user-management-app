import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUserForm({ addLocalUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email) return alert('Name and Email required!');
    const newUser = { id: Date.now(), name, email, company: { name: 'Local' } };
    addLocalUser(newUser);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;
