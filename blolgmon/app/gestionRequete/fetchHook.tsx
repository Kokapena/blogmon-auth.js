import { useState, useEffect } from 'react';

export interface FetchState<T> {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
}

export function useFetch<T>(url: string, donnee: any, methode: string): FetchState<T> {
  const [donnees, modifDonnes] = useState<T | null>(null);
  const [chargement, modifChargement] = useState(true);
  const [erreur, modifErreur] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: methode,
          headers: {
            'Content-Type': 'application/json',
          },
          body: donnee ? JSON.stringify(donnee) : null,
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des données : ${response.statusText}`);
        }

        const json = await response.json();
        modifDonnes(json);
      } catch (err) {
        modifErreur(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        modifChargement(false);
      }
    };

    fetchData();
  }, [url, donnee]);

  return { donnees, chargement, erreur };
}
