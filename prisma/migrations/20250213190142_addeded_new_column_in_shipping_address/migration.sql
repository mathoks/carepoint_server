/*
  Warnings:

  - Added the required column `contact_name` to the `shipping_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `shipping_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile_no` to the `shipping_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `shipping_address` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ISDEFAULT" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "shipping_address" ADD COLUMN     "contact_name" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "is_default" "ISDEFAULT" NOT NULL DEFAULT 'false',
ADD COLUMN     "mobile_no" TEXT NOT NULL,
ADD COLUMN     "suite_no" TEXT,
ADD COLUMN     "zip_code" TEXT NOT NULL;
