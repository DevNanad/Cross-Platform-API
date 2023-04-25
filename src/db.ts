import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


// Test the database connection on startup
prisma.$connect().then(() => {
  console.log('Connected to the database.');
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});

// Handle graceful shutdown
prisma.$on('beforeExit', async () => {
  await prisma.$disconnect();
  console.log('Disconnected from the database.');
});

export default prisma;
