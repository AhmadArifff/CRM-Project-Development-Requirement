-- ==============================================================================
-- DEVPULSE STUDIO — COMPLETE SUPABASE SEED DATA SCRIPT FOR AHMAD ARIF
-- Target Database: Supabase PostgreSQL (Project Ref: ydpmuauskndowontbfhx)
-- Copy & Paste this script after running full_schema_migration.sql!
-- ==============================================================================

-- 1. Seed Admin Users (Ahmad Arif)
INSERT INTO "User" (
    "id", "name", "email", "password", "avatar", "bio", "hourlyRate", "timezone", "role", "createdAt", "updatedAt"
) VALUES 
('usr_admin_ahmad_001', 'Ahmad Arif', 'ahmadarif@devpulsestudio.dev', '$2a$10$w3U6UaJ9K5L4jN2B0V5y.e.0J3K0J3K0J3K0J3K0J3K0J3K0J', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', 'Lead Developer & Founder at DevPulse Studio.', 250000.00, 'Asia/Jakarta', 'ADMIN', NOW(), NOW()),
('usr_admin_devpulse_002', 'Ahmad Arif (Admin)', 'admin@devpulsestudio.dev', '$2a$10$w3U6UaJ9K5L4jN2B0V5y.e.0J3K0J3K0J3K0J3K0J3K0J3K0J', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', 'Founder at DevPulse Studio.', 250000.00, 'Asia/Jakarta', 'ADMIN', NOW(), NOW()),
('usr_admin_ahmad_003', 'Ahmad Arif', 'ahmadarifff@gmail.com', '$2a$10$w3U6UaJ9K5L4jN2B0V5y.e.0J3K0J3K0J3K0J3K0J3K0J3K0J', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', 'Developer & Founder at DevPulse Studio.', 250000.00, 'Asia/Jakarta', 'ADMIN', NOW(), NOW())
ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "role" = EXCLUDED."role";

-- 2. Seed Master Labels
INSERT INTO "MasterLabel" ("id", "name", "color", "bgClass", "textClass", "borderClass", "createdAt", "updatedAt") VALUES
('lbl-1', 'Frontend', 'purple', 'bg-purple-500/20', 'text-purple-300', 'border-purple-500/30', NOW(), NOW()),
('lbl-2', 'Backend', 'blue', 'bg-blue-500/20', 'text-blue-300', 'border-blue-500/30', NOW(), NOW()),
('lbl-3', 'Database', 'emerald', 'bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/30', NOW(), NOW()),
('lbl-4', 'UI/UX', 'pink', 'bg-pink-500/20', 'text-pink-300', 'border-pink-500/30', NOW(), NOW()),
('lbl-5', 'AI / ML', 'cyan', 'bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/30', NOW(), NOW()),
('lbl-6', 'Security', 'amber', 'bg-amber-500/20', 'text-amber-300', 'border-amber-500/30', NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- 3. Seed Sample Leads
INSERT INTO "Lead" ("id", "name", "company", "email", "phone", "source", "status", "notes", "appTitle", "createdAt", "updatedAt") VALUES
('lead-1', 'Budi Santoso', 'TokoMajuloka Startup', 'budi@tokomajuloka.com', '+62 812-9988-7766', 'LANDING_PAGE', 'NEW', 'Membutuhkan aplikasi mobile Android/iOS Flutter dengan backend Supabase.', 'TokoMajuloka Mobile App E-Commerce', NOW(), NOW()),
('lead-2', 'Dewi Lestari', 'LogisX Express', 'dewi@logisx.co.id', '+62 815-4433-2211', 'DIRECT', 'QUALIFIED', 'Sudah diskusi requirement server dedicated vs cloud VPS.', 'LogisX Fleet Management Platform', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- 4. Seed Sample Deals
INSERT INTO "Deal" ("id", "title", "value", "currency", "stage", "description", "leadId", "createdAt", "updatedAt") VALUES
('deal-1', 'Deal — TokoMajuloka E-Commerce App', 25000000.00, 'IDR', 'NEW_LEAD', 'Integrasi payment gateway DOKU & Midtrans.', 'lead-1', NOW(), NOW()),
('deal-2', 'Deal — LogisX Fleet Tracker Web App', 45000000.00, 'IDR', 'PROPOSAL_SENT', 'Proposal arsitektur server & pengerjaan 6 minggu.', 'lead-2', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- 5. Seed AI Providers Config
INSERT INTO "AiProvider" ("id", "providerKey", "name", "apiKey", "isActive", "isDefault", "selectedModel", "availableModels", "createdAt", "updatedAt") VALUES
('p-1', 'GEMINI', 'Google Gemini AI Engine', 'AIzaSyD-1234567890abcdef', true, true, 'gemini-1.5-flash', ARRAY['gemini-1.5-flash', 'gemini-1.5-pro'], NOW(), NOW()),
('p-2', 'OPENAI', 'OpenAI GPT-4o Engine', 'sk-proj-1234567890abcdef', true, false, 'gpt-4o-mini', ARRAY['gpt-4o-mini', 'gpt-4o'], NOW(), NOW())
ON CONFLICT ("providerKey") DO NOTHING;
