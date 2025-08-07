-- DropForeignKey
ALTER TABLE "prod_reviews" DROP CONSTRAINT "usercomm_ffks";

-- AddForeignKey
ALTER TABLE "prod_reviews" ADD CONSTRAINT "usercomm_ffks" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
