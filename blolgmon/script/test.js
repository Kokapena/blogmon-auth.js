const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
  try {
    const users = await prisma.utilisateur.findMany();
    console.log("Utilisateurs :", users);
  } catch (error) {
    console.error("Erreur lors de l'accès à la base :", error);
  } finally {
    await prisma.$disconnect();
  }
})();
