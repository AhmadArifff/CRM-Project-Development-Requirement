-- DEVPULSE STUDIO - SEED SQL FOR AHMAD ARIF
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
    'usr_admin_ahmad_001',
    'Ahmad Arif',
    'ahmadarif@devpulsestudio.dev',
    '$2a$10$w3U6UaJ9K5L4jN2B0V5y.e.0J3K0J3K0J3K0J3K0J3K0J3K0J',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    'Lead Developer & Founder at DevPulse Studio.',
    250000.00,
    'Asia/Jakarta',
    'ADMIN',
    NOW(),
    NOW()
) ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "role" = EXCLUDED."role";
