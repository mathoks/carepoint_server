/*
  Warnings:

  - Added the required column `CartID` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_CartItemID_fkey";

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "CartID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_CartID_fkey" FOREIGN KEY ("CartID") REFERENCES "cart"("CartID") ON DELETE RESTRICT ON UPDATE CASCADE;
