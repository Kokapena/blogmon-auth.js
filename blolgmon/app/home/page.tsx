'use client'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HelloPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Rediriger vers la page de connexion
      router.push("/connexion");
    },
  });

  if (status === "loading") {
    return <p>Chargement...</p>; // Affiche un état de chargement pendant que la session se charge
  }

  return (
    <main className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold text-center mb-5">Articles du Blolgmon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="bg-white shadow-lg rounded p-5">
          <img src="img/news-700x435-1.jpg" alt="News" className="w-full h-64 object-cover rounded mb-3" />
          <h2 className="text-xl font-bold mb-2">Lorem ipsum dolor sit amet elit...</h2>
          <p className="text-gray-600">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna...</p>
        </article>
        <article className="bg-white shadow-lg rounded p-5">
          <img src="img/news-700x435-2.jpg" alt="News" className="w-full h-64 object-cover rounded mb-3" />
          <h2 className="text-xl font-bold mb-2">Dolor lorem eos dolor duo...</h2>
          <p className="text-gray-600">Dolor sit magna rebum clita rebum dolor stet amet justo...</p>
        </article>
      </div>
    </main>
  );
}
