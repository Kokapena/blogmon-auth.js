import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient(); //Création du client Prisma 

export const authOptions = {
  session: {
    strategy: "jwt", // Configuration de NextAuth
  },
  providers: [
    CredentialsProvider({ // Fournisseur d'identification
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) { // Fonction authorize
        const { email, password } = credentials;

        // Recherche de l'utilisateur dans la base de données
        const user = await prisma.utilisateur.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Utilisateur introuvable");
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.mdp);
        if (!isPasswordValid) {
          throw new Error("Mot de passe invalide");
        }

        // Retourne les informations de l'utilisateur si tout est correct
        return {
          id: user.id,
          email: user.email,
          pseudo: user.pseudo,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.pseudo = user.pseudo
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          pseudo: token.pseudo,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Assurez-vous que cette variable est définie dans votre fichier .env
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
