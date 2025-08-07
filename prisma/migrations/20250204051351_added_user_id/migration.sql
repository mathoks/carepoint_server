-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_id_fkey";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "user_id" TEXT NOT NULL DEFAULT 'cm3o8cppm00013oppz165h166';

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
