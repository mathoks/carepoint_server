-- AddForeignKey
ALTER TABLE "public"."order_details" ADD CONSTRAINT "order_details_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."variant_attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
