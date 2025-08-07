/*
  Warnings:

  - The primary key for the `cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[CartItemID]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_CartItemID_key" ON "cart_item"("CartItemID");
