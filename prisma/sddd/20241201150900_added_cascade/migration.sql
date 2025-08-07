-- DropForeignKey
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_reviewer_id_category_id_fkey";

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_reviewer_id_category_id_fkey" FOREIGN KEY ("reviewer_id", "category_id") REFERENCES "prod_reviews"("id", "category_id") ON DELETE CASCADE ON UPDATE NO ACTION;
