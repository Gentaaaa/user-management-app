import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';

export default function AddUserForm({ existingUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => Array.isArray(state.users) ? state.users : []);

  // Nëse kemi existingUser, e përdorim për editim
  const [formData, setFormData] = useState({
    name: existingUser?.name || '',
    email: existingUser?.email || '',
    phone: existingUser?.phone || '',
    website: existingUser?.website || '',
    address: {
      street: existingUser?.address?.street || '',
      city: existingUser?.address?.city || ''
    }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'street' || name === 'city') {
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // ID unik
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    const newUser = existingUser
      ? { ...existingUser, ...formData } // edit
      : { ...formData, id: maxId + 1 }; // new

    dispatch(addUser(newUser));
    navigate('/');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{existingUser ? 'Edit User' : 'Add User'}</h1>

        {['name','email','phone','website','street','city'].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            value={
              field === 'street' || field === 'city'
                ? formData.address[field]
                : formData[field]
            }
            onChange={handleChange}
            placeholder={field}
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {existingUser ? 'Save Changes' : 'Add User'}
        </button>
      </form>
    </div>
  );
}
