import { prisma } from "@/db/prisma"; // Assurez-vous que le chemin vers prisma est correct
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { pseudo, nom, prenom, anniversaire, email, mdp, description } = await req.json();

    // Validation des champs
    if (!pseudo || !nom || !prenom || !email || !mdp || !anniversaire) {  // validation des champs requis
      return new Response(
        JSON.stringify({ success: false, message: "Tous les champs requis doivent être remplis." }),
        { status: 400 }
      );
    }

    if (!email.includes("@")) {   // validation de L'email
      return new Response(
        JSON.stringify({ success: false, message: "Adresse email invalide." }),
        { status: 400 }
      );
    }

    const dateAnniversaire = new Date(anniversaire);    // Validation de la date d'anniversaire :
    if (isNaN(dateAnniversaire.getTime())) {
      return new Response(
        JSON.stringify({ success: false, message: "Date d'anniversaire invalide." }),
        { status: 400 }
      );
    }

    // Vérifier si l'email ou le pseudo existe déjà
    const utilisateurExistant = await prisma.utilisateur.findFirst({   // Vérification de l'existence d'un utilisateur
      where: {
        OR: [
          { email },
          { pseudo }
        ]
      }
    });

    if (utilisateurExistant) {
      return new Response(
        JSON.stringify({ success: false, message: "L'email ou le pseudo est déjà utilisé." }),
        { status: 400 }
      );
    }

    // Hacher le mot de passe
    const mdpHash = await bcrypt.hash(mdp, 10); // Hachage du mot de passe

    // Créer l'utilisateur dans la base de données
    const utilisateur = await prisma.utilisateur.create({ // Création de l'utilisateur
      data: {
        pseudo,
        nom,
        prenom,
        anniversaire: dateAnniversaire,
        email,
        mdp: mdpHash,
        description,
        date_creation: new Date(),
      },
    });
 
    return new Response( // Réponse en cas de succès
      JSON.stringify({
        success: true,
        message: "Utilisateur créé avec succès.",
      }),
      { status: 200 }
    );
  } catch (error: any) { // Gestion des erreurs
    console.error("Erreur lors de l'inscription:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
