/*
  Warnings:

  - A unique constraint covering the columns `[ProductID]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_productID_fkey";

-- DropIndex
DROP INDEX "cart_item_productID_key";

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_ProductID_key" ON "cart_item"("ProductID");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
