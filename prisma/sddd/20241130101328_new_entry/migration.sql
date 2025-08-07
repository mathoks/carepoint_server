/*
  Warnings:

  - The primary key for the `reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_id_category_id_fkey";

-- AlterTable
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_pkey",
ADD CONSTRAINT "reaction_pkey" PRIMARY KEY ("category_id", "reviewer_id");

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_reviewer_id_category_id_fkey" FOREIGN KEY ("reviewer_id", "category_id") REFERENCES "prod_reviews"("id", "category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
