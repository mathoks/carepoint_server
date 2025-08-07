/*
  Warnings:

  - The primary key for the `reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_pkey",
ADD CONSTRAINT "reaction_pkey" PRIMARY KEY ("id", "reviewer_id");
