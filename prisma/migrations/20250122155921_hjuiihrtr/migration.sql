/*
  Warnings:

  - Added the required column `stockQuantity` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "stockQuantity" INTEGER NOT NULL;
