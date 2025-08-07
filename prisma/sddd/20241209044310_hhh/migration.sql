/*
  Warnings:

  - You are about to drop the column `orderQt` on the `product` table. All the data in the column will be lost.
  - Added the required column `TotalPrice` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userID_fkey";

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "TotalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "orderQt",
ADD COLUMN     "order_qt" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "variant_attribute" ADD COLUMN     "originalPrice" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
