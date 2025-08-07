/*
  Warnings:

  - You are about to drop the column `cartID` on the `cart_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_cartID_fkey";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "IsActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "cart_item" DROP COLUMN "cartID";

-- CreateTable
CREATE TABLE "cart_item_is_variant" (
    "CartItemID" TEXT NOT NULL,
    "variant_id" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "TotalPrice" INTEGER NOT NULL,
    "AddedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_item_is_variant_pkey" PRIMARY KEY ("CartItemID")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_is_variant_variant_id_key" ON "cart_item_is_variant"("variant_id");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_CartItemID_fkey" FOREIGN KEY ("CartItemID") REFERENCES "cart"("CartID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item_is_variant" ADD CONSTRAINT "cart_item_is_variant_CartItemID_fkey" FOREIGN KEY ("CartItemID") REFERENCES "cart"("CartID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item_is_variant" ADD CONSTRAINT "cart_item_is_variant_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variant_attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
