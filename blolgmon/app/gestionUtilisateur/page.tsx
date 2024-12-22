'use client'; // Indique que ce composant est côté client

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Utilisez `useRouter` de "next/navigation" dans le format app
import Link from "next/link";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true, // Bloque automatiquement l'accès si l'utilisateur n'est pas authentifié
    // onUnauthenticated() {
    //   // Redirige vers une page de connexion si non authentifié
    //   router.push("/connexion");
    // },
  });

  if (status === "loading") {
    // Affiche un état de chargement pendant la vérification de la session
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-xl">Chargement...</p>
      </div>
    );
  }

  if (!session) {
    // Optionnel : un fallback si l'utilisateur n'est pas redirigé
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-xl">Vous devez être connecté pour accéder à cette page.</p>
      </div>
    );
  }

  // Contenu principal si l'utilisateur est connecté
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-4">Page du Tableau de Bord</h1>
      <p className="text-xl mb-4">Bonjour {session?.user?.pseudo}</p>
      <Link
        href="/logout"
        className="text-blue-400 hover:text-blue-600 transition duration-300 mt-8"
      >
        Se déconnecter
      </Link>
      <div className="flex justify-center mt-8">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-96 h-96 object-contain"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
