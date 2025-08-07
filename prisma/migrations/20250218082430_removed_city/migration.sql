/*
  Warnings:

  - You are about to drop the column `city` on the `shipping_address` table. All the data in the column will be lost.
  - Added the required column `lga` to the `shipping_address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipping_address" DROP COLUMN "city",
ADD COLUMN     "lga" TEXT NOT NULL;
