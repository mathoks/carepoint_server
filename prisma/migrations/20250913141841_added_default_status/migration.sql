/*
  Warnings:

  - The `Status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `PaymentMethod` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CARD', 'TRANSFER');

-- CreateEnum
CREATE TYPE "public"."Order_status" AS ENUM ('COMPLETED', 'CLOSED', 'PENDING');

-- AlterTable
ALTER TABLE "public"."orders" DROP COLUMN "PaymentMethod",
ADD COLUMN     "PaymentMethod" "public"."PaymentMethod" NOT NULL,
DROP COLUMN "Status",
ADD COLUMN     "Status" "public"."Order_status" NOT NULL DEFAULT 'PENDING';
