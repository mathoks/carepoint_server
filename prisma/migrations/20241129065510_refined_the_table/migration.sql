/*
  Warnings:

  - You are about to drop the column `count` on the `reaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewer_id,user_id,prod_id]` on the table `reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewer_id` to the `reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_user_id_fkey";

-- DropIndex
DROP INDEX "reaction_user_id_key";

-- DropIndex
DROP INDEX "unik_reactionss";

-- AlterTable
ALTER TABLE "reaction" DROP COLUMN "count",
ADD COLUMN     "reviewer_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reaction_reviewer_id_user_id_prod_id_key" ON "reaction"("reviewer_id", "user_id", "prod_id");

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
