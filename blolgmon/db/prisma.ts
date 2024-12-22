/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialisation unique de Prisma Client
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"] // Log supplémentaire pour le développement
        : ["error"], // Moins de logs en production
  });

// Assurez-vous que Prisma n'est pas réinitialisé à chaque rechargement en développement
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
