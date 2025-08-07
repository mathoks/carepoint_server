/*
  Warnings:

  - You are about to drop the `Hint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hint" DROP CONSTRAINT "Hint_id_fkey";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "hint_text" TEXT;

-- DropTable
DROP TABLE "Hint";
