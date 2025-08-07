-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_review_id_category_id_comenter_id_fkey" FOREIGN KEY ("review_id", "category_id", "comenter_id") REFERENCES "prod_reviews"("id", "category_id", "user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
