import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function UserDetails({ localUsers = [], updateLocalUser }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLocal, setIsLocal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    // kontrollojmë nëse është local user (id s’ka numër normal API-je)
    const localUser = localUsers.find((u) => String(u.id) === id);
    if (localUser) {
      setUser(localUser);
      setFormData({ name: localUser.name, email: localUser.email });
      setIsLocal(true);
    } else {
      // fetch nga API
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setFormData({ name: data.name, email: data.email });
        });
    }
  }, [id, localUsers]);

  const handleSave = () => {
    if (isLocal) {
      const updated = { ...user, ...formData };
      updateLocalUser(updated);
      setUser(updated);
    }
    setEditing(false);
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>

      {editing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded block"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 rounded block"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {!isLocal && <p><strong>Phone:</strong> {user.phone}</p>}
          {!isLocal && <p><strong>Website:</strong> {user.website}</p>}
        </div>
      )}

      {isLocal && !editing && (
        <button
          onClick={() => setEditing(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
      )}

      <Link to="/" className="block mt-4 text-blue-500">
        Back to Home
      </Link>
    </div>
  );
}

export default UserDetails;
