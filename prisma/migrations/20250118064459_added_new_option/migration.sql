/*
  Warnings:

  - You are about to drop the `cart_item_is_variant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[variant_id]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_productID_fkey";

-- DropForeignKey
ALTER TABLE "cart_item_is_variant" DROP CONSTRAINT "cart_item_is_variant_CartItemID_fkey";

-- DropForeignKey
ALTER TABLE "cart_item_is_variant" DROP CONSTRAINT "cart_item_is_variant_variant_id_fkey";

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "variant_id" TEXT,
ALTER COLUMN "productID" DROP NOT NULL;

-- DropTable
DROP TABLE "cart_item_is_variant";

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_variant_id_key" ON "cart_item"("variant_id");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variant_attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;
