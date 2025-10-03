import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser } from '../store/usersSlice';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state =>
    Array.isArray(state.users)
      ? state.users.find(u => u.id === parseInt(id))
      : null
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    website: user?.website || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || ''
    }
  });

  if (!user) return <p className="p-6">User not found.</p>;

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

  const handleSave = () => {
    dispatch(updateUser({ ...user, ...formData }));
    setEditMode(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
      >
        Back
      </button>

      {!editMode ? (
        <div className="bg-white p-6 rounded shadow max-w-md">
          <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Address:</strong> {user.address?.street}, {user.address?.city}</p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow max-w-md">
          <h1 className="text-2xl font-bold mb-4">Edit User</h1>
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
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
