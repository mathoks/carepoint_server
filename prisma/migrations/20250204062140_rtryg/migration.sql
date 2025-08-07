/*
  Warnings:

  - You are about to drop the column `provider_account_id` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "account_provider_provider_account_id_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "provider_account_id",
ADD COLUMN     "providerAccountId" TEXT NOT NULL DEFAULT 'cm3o8cppm00013oppz165h166';

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");
