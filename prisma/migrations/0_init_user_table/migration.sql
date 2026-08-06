-- Migration: 0_init_user_table
-- Target Database: Supabase PostgreSQL (Project Ref: ydpmuauskndowontbfhx)
-- Description: Create User & Session tables with unique indexes, foreign keys, and default values.

-- 1. Create "User" Table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "bio" TEXT,
    "hourlyRate" DECIMAL(10,2) DEFAULT 250000.00,
    "timezone" TEXT DEFAULT 'Asia/Jakarta',
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- 2. Create "Session" Table
CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- 3. Create Unique Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_refreshToken_key" ON "Session"("refreshToken");

-- 4. Create Foreign Key Constraints
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
