/*
  Warnings:

  - Added the required column `isVariant` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VARIANT" AS ENUM ('TRUE', 'FALSE');

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "isVariant" "VARIANT" NOT NULL;
