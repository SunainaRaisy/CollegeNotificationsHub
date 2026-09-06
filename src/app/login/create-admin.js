const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: {
      username: 'Admin',
    },
    update: {
      password,
      role: 'ADMIN',
      department: null,
    },
    create: {
      username: 'Admin',
      password,
      role: 'ADMIN',
      department: null,
    },
  });

  console.log('Admin created successfully!');
  console.log('Username:', admin.username);
  console.log('Password: Admin@123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });