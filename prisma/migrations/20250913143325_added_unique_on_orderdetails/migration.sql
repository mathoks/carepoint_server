/*
  Warnings:

  - A unique constraint covering the columns `[product_id,variant_id,order_id]` on the table `order_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isVariant` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."order_details_product_id_key";

-- AlterTable
ALTER TABLE "public"."order_details" ADD COLUMN     "isVariant" "public"."VARIANT" NOT NULL,
ADD COLUMN     "variant_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "order_item_key" ON "public"."order_details"("product_id", "variant_id", "order_id");
