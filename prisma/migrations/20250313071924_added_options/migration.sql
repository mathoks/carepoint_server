-- AlterTable
ALTER TABLE "user_preferences" ALTER COLUMN "preferred_language" DROP NOT NULL,
ALTER COLUMN "preferred_currency" DROP NOT NULL;
