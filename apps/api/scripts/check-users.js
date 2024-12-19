const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users:', JSON.stringify(users.map(u => ({
    id: u.id,
    email: u.email,
    isVerified: u.isVerified,
    hasVerifyToken: !!u.verifyToken
  })), null, 2));
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
