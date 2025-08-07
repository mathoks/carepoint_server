/*
  Warnings:

  - The values [TRUE,FALSE] on the enum `VARIANT` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `Price` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VARIANT_new" AS ENUM ('true', 'false');
ALTER TABLE "cart_item" ALTER COLUMN "isVariant" TYPE "VARIANT_new" USING ("isVariant"::text::"VARIANT_new");
ALTER TYPE "VARIANT" RENAME TO "VARIANT_old";
ALTER TYPE "VARIANT_new" RENAME TO "VARIANT";
DROP TYPE "VARIANT_old";
COMMIT;

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "Price" INTEGER NOT NULL;
