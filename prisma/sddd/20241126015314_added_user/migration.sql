/*
  Warnings:

  - A unique constraint covering the columns `[category_id,user_id,prod_id]` on the table `reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prod_id` to the `reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_id_category_id_user_id_fkey";

-- DropIndex
DROP INDEX "unik_reactions";

-- AlterTable
ALTER TABLE "reaction" ADD COLUMN     "prod_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "unik_reactionss" ON "reaction"("category_id", "user_id", "prod_id");

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_category_id_user_id_prod_id_fkey" FOREIGN KEY ("category_id", "user_id", "prod_id") REFERENCES "prod_reviews"("category_id", "user_id", "prod_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
