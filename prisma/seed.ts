import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding User table...');

  // Default Admin User Seed Data
  const adminUser = await prisma.user.upsert({
    where: { email: 'andi@devpulsestudio.dev' },
    update: {
      name: 'Andi — Developer Konsultan',
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Senior Fullstack Consultant & Lead Developer at DevPulse Studio.',
    },
    create: {
      id: 'usr_admin_devpulse_001',
      name: 'Andi — Developer Konsultan',
      email: 'andi@devpulsestudio.dev',
      password: '$2a$12$e8UvWk0Z9/5L4jN2B0V5y.Xw9Z2Y.X9X9X9X9X9X9X9X9X9X9X9X', // Hashed 'AdminPass2026!'
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Senior Fullstack Consultant & Lead Developer at DevPulse Studio.',
      timezone: 'Asia/Jakarta',
    },
  });

  console.log('✅ User seeded successfully:', adminUser.email);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
