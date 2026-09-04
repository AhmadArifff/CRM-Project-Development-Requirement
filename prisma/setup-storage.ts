import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupStorageBuckets() {
  console.log('📦 Initializing Supabase Storage Buckets and Policies...');

  const buckets = [
    'prd-documents',
    'landing-assets',
    'crm-attachments',
    'devpulse-storage',
  ];

  for (const bucket of buckets) {
    try {
      await prisma.$executeRawUnsafe(`
        INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
        VALUES ('${bucket}', '${bucket}', true, 52428800, null)
        ON CONFLICT (id) DO UPDATE SET public = true;
      `);
      console.log(`✅ Bucket "${bucket}" is ready & public!`);
    } catch (err: any) {
      console.warn(`⚠️ Note for bucket "${bucket}":`, err.message);
    }
  }

  // Setup Storage RLS Policies
  const policies = [
    {
      name: 'Allow Public Read Objects',
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Read Objects' AND tablename = 'objects'
          ) THEN
            CREATE POLICY "Allow Public Read Objects" ON storage.objects
            FOR SELECT USING (true);
          END IF;
        END $$;
      `,
    },
    {
      name: 'Allow Public Insert Objects',
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Insert Objects' AND tablename = 'objects'
          ) THEN
            CREATE POLICY "Allow Public Insert Objects" ON storage.objects
            FOR INSERT WITH CHECK (true);
          END IF;
        END $$;
      `,
    },
    {
      name: 'Allow Public Update Objects',
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Update Objects' AND tablename = 'objects'
          ) THEN
            CREATE POLICY "Allow Public Update Objects" ON storage.objects
            FOR UPDATE USING (true);
          END IF;
        END $$;
      `,
    },
    {
      name: 'Allow Public Delete Objects',
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Delete Objects' AND tablename = 'objects'
          ) THEN
            CREATE POLICY "Allow Public Delete Objects" ON storage.objects
            FOR DELETE USING (true);
          END IF;
        END $$;
      `,
    },
  ];

  for (const pol of policies) {
    try {
      await prisma.$executeRawUnsafe(pol.sql);
      console.log(`✅ Storage Policy "${pol.name}" applied successfully!`);
    } catch (err: any) {
      console.warn(`⚠️ Note for policy "${pol.name}":`, err.message);
    }
  }

  console.log('🎉 Supabase Storage Buckets & Policies setup completed!');
}

setupStorageBuckets()
  .catch((e) => {
    console.error('❌ Error setting up storage:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
