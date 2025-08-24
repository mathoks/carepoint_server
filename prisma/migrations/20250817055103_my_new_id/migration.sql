/*
  Warnings:

  - You are about to drop the column `productID` on the `cart_item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ProductID,variant_id,CartID]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ProductID` on table `cart_item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."cart_item_ProductID_key";

-- DropIndex
DROP INDEX "public"."cart_item_variant_id_key";

-- AlterTable
ALTER TABLE "public"."cart_item" DROP COLUMN "productID",
ALTER COLUMN "ProductID" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_key" ON "public"."cart_item"("ProductID", "variant_id", "CartID");
