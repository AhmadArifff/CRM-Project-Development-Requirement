import { createClient } from '@supabase/supabase-js';

// Supabase Environment Configurations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ydpmuauskndowontbfhx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcG11YXVza25kb3dvbnRiZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDY1NzcsImV4cCI6MjEwMTU4MjU3N30.1Hk7XWcOnpXYf0RKWPVqw298tyPcyxLkTXvTAPAkBOo';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public Client (Client-Side & Public Bucket Access)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage Bucket Constants
export const SUPABASE_BUCKETS = {
  PRD_DOCUMENTS: process.env.SUPABASE_STORAGE_BUCKET_PRD || 'prd-documents',
  LANDING_ASSETS: process.env.SUPABASE_STORAGE_BUCKET_ASSETS || 'landing-assets',
  CRM_ATTACHMENTS: process.env.SUPABASE_STORAGE_BUCKET_ATTACHMENTS || 'crm-attachments',
};

// Admin Client (Server-Side Only - Private Buckets & User Management)
export const getSupabaseAdminClient = () => {
  if (!supabaseServiceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Falling back to public client.');
    return supabase;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
