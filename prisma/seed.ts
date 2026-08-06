import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding User & Master Data tables for Ahmad Arif...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 1. Ahmad Arif - Primary Admin User
  const adminUser1 = await prisma.user.upsert({
    where: { email: 'ahmadarif@devpulsestudio.dev' },
    update: {
      name: 'Ahmad Arif',
      role: 'ADMIN',
      password: hashedPassword,
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Lead Developer & Founder at DevPulse Studio.',
    },
    create: {
      id: 'usr_admin_ahmad_001',
      name: 'Ahmad Arif',
      email: 'ahmadarif@devpulsestudio.dev',
      password: hashedPassword,
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Lead Developer & Founder at DevPulse Studio.',
      timezone: 'Asia/Jakarta',
    },
  });

  // 2. Admin Alias 1 - admin@devpulsestudio.dev
  const adminUser2 = await prisma.user.upsert({
    where: { email: 'admin@devpulsestudio.dev' },
    update: {
      name: 'Ahmad Arif (Admin)',
      role: 'ADMIN',
      password: hashedPassword,
    },
    create: {
      id: 'usr_admin_devpulse_002',
      name: 'Ahmad Arif (Admin)',
      email: 'admin@devpulsestudio.dev',
      password: hashedPassword,
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Founder at DevPulse Studio.',
      timezone: 'Asia/Jakarta',
    },
  });

  // 3. Admin Alias 2 - ahmadarifff@gmail.com
  const adminUser3 = await prisma.user.upsert({
    where: { email: 'ahmadarifff@gmail.com' },
    update: {
      name: 'Ahmad Arif',
      role: 'ADMIN',
      password: hashedPassword,
    },
    create: {
      id: 'usr_admin_ahmad_003',
      name: 'Ahmad Arif',
      email: 'ahmadarifff@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Developer & Founder at DevPulse Studio.',
      timezone: 'Asia/Jakarta',
    },
  });

  console.log('✅ Users seeded successfully:');
  console.log(' -', adminUser1.email, '(Pass: admin123)');
  console.log(' -', adminUser2.email, '(Pass: admin123)');
  console.log(' -', adminUser3.email, '(Pass: admin123)');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
