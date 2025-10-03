import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUserForm({ addLocalUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email) return alert('Name and email are required');

    // Krijo user-in lokal me të gjitha fushat
    const newUser = {
      id: Date.now(), // ID unike
      name,
      email,
      phone,
      website,
      address: {
        street,
        city
      }
    };

    addLocalUser(newUser);
    navigate('/'); // kthehu te lista
  };

  return (
    <form className="max-w-md mx-auto p-4 border rounded shadow mt-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add New User</h2>

      <input
        className="border p-2 mb-2 w-full rounded"
        placeholder="Name*"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full rounded"
        placeholder="Email*"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full rounded"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full rounded"
        placeholder="Website"
        value={website}
        onChange={e => setWebsite(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full rounded"
        placeholder="Street"
        value={street}
        onChange={e => setStreet(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full rounded"
        placeholder="City"
        value={city}
        onChange={e => setCity(e.target.value)}
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2 w-full hover:bg-blue-700">
        Add User
      </button>
    </form>
  );
}

export default AddUserForm;
