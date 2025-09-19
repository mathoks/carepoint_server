/*
  Warnings:

  - The `preferred_payment_method` column on the `user_preferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ShippingFee` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DELOPTIONS" AS ENUM ('PICKUP', 'STANDARD');

-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "DeliveryOption" "public"."DELOPTIONS" NOT NULL DEFAULT 'STANDARD',
ADD COLUMN     "OrderNote" TEXT,
ADD COLUMN     "ShippingFee" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "PaymentMethod" SET DEFAULT 'CARD';

-- AlterTable
ALTER TABLE "public"."user_preferences" DROP COLUMN "preferred_payment_method",
ADD COLUMN     "preferred_payment_method" "public"."PaymentMethod";
