/*
  Warnings:

  - The primary key for the `reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `reation_type` to the `reaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Reaction" AS ENUM ('YES', 'NO');

-- DropForeignKey
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_category_id_user_id_prod_id_fkey";

-- AlterTable
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_pkey",
ADD COLUMN     "reation_type" "Reaction" NOT NULL,
ADD CONSTRAINT "reaction_pkey" PRIMARY KEY ("category_id", "id");

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_id_category_id_fkey" FOREIGN KEY ("id", "category_id") REFERENCES "prod_reviews"("id", "category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
