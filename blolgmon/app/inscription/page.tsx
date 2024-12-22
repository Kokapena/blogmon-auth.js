"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const pageInscription = () => {
  const router = useRouter();
  const [donneeForm, modifDonneeForm] = useState({
    pseudo: "",
    nom: "",
    prenom: "",
    anniversaire: "",
    email: "",
    mdp: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const gestionModifDonneeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    modifDonneeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/inscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donneeForm),
    });

    const data = await response.json();

    if (data.success) {
      setSuccessMessage("Inscription réussie !");
      modifDonneeForm({
        pseudo: "",
        nom: "",
        prenom: "",
        anniversaire: "",
        email: "",
        mdp: "",
        description: "",
      });
    } else {
      setError(data.message || "Une erreur est survenue.");
    }
  };

  const redirectionConnexion = () => {
    router.push("/connexion");
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-5 bg-white rounded-lg shadow-md mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pseudo" className="block text-lg font-medium text-gray-700">
              Pseudo :
            </label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              value={donneeForm.pseudo}
              onChange={gestionModifDonneeForm}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="nom" className="block text-lg font-medium text-gray-700">
              Nom :
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={donneeForm.nom}
              onChange={gestionModifDonneeForm}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-lg font-medium text-gray-700">
              Prénom :
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={donneeForm.prenom}
              onChange={gestionModifDonneeForm}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="anniversaire" className="block text-lg font-medium text-gray-700">
              Anniversaire :
            </label>
            <input
              type="date"
              id="anniversaire"
              name="anniversaire"
              value={donneeForm.anniversaire}
              onChange={gestionModifDonneeForm}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={donneeForm.email}
              onChange={gestionModifDonneeForm}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="mdp" className="block text-lg font-medium text-gray-700">
              Mot de passe :
            </label>
            <input
              type="password"
              id="mdp"
              name="mdp"
              value={donneeForm.mdp}
              onChange={gestionModifDonneeForm}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description (facultatif) :
            </label>
            <input
              id="description"
              name="description"
              value={donneeForm.description}
              onChange={gestionModifDonneeForm}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            S'inscrire
          </button>
        </form>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
      </div>

      <div className="text-center mt-6">
        <p className="text-lg">Déjà inscrit ?</p>
        <button
          onClick={redirectionConnexion}
          className="text-blue-600 hover:underline mt-2"
        >
          Connectez-vous ici
        </button>
      </div>
    </>
  );
};

export default pageInscription;
