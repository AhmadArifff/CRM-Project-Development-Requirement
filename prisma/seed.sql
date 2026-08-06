-- SQL Seed: User Table Initial Data
-- Target Database: Supabase PostgreSQL (Project Ref: ydpmuauskndowontbfhx)

INSERT INTO "User" (
    "id", 
    "name", 
    "email", 
    "password", 
    "avatar", 
    "bio", 
    "hourlyRate", 
    "timezone", 
    "role", 
    "createdAt", 
    "updatedAt"
) VALUES (
    'usr_admin_devpulse_001',
    'Andi — Developer Konsultan',
    'andi@devpulsestudio.dev',
    '$2a$12$e8UvWk0Z9/5L4jN2B0V5y.Xw9Z2Y.X9X9X9X9X9X9X9X9X9X9X9X', -- Hashed 'AdminPass2026!'
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    'Senior Fullstack Consultant & Lead Developer at DevPulse Studio.',
    250000.00,
    'Asia/Jakarta',
    'ADMIN',
    NOW(),
    NOW()
)
ON CONFLICT ("email") 
DO UPDATE SET 
    "name" = EXCLUDED."name",
    "role" = EXCLUDED."role",
    "hourlyRate" = EXCLUDED."hourlyRate",
    "updatedAt" = NOW();
