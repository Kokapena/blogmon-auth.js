"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com" },
    { id: 2, name: "Marie Curie", email: "marie.curie@example.com" },
  ]);
  const [formData, setFormData] = useState({ id: 0, name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => setFormData({ id: 0, name: "", email: "" });

  const handleAddUser = () => {
    if (formData.name.trim() && formData.email.trim()) {
      setUsers([
        ...users,
        { id: Date.now(), name: formData.name, email: formData.email },
      ]);
      resetForm();
    }
  };

  const handleEditUser = (user: User) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((user) =>
        user.id === formData.id ? { ...user, ...formData } : user
      )
    );
    resetForm();
    setIsEditing(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

      {/* Formulaire d'ajout/modification */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-600"
          />
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateUser}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Mettre à jour
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Annuler
                </button>
              </>
            ) : (
              <button
                onClick={handleAddUser}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Ajouter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
        {users.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-200 px-4 py-2">Nom</th>
                <th className="border border-gray-200 px-4 py-2">Email</th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">Aucun utilisateur trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;
