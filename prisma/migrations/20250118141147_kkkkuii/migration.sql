-- DropIndex
DROP INDEX "cart_item_CartItemID_key";

-- AlterTable
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_pkey" PRIMARY KEY ("CartItemID");
