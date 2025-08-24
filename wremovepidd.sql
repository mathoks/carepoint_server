-- DropIndex
DROP INDEX "public"."cart_item_ProductID_key";

-- DropIndex
DROP INDEX "public"."cart_item_variant_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_key" ON "public"."cart_item"("ProductID", "variant_id", "CartID");

