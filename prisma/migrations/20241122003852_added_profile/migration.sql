/*
  Warnings:

  - You are about to drop the column `prodId` on the `prodimage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "prodimage" DROP CONSTRAINT "prodimage_prodId_fkey";

-- AlterTable
ALTER TABLE "prodimage" DROP COLUMN "prodId";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prodimage" ADD CONSTRAINT "prodimage_id_fkey" FOREIGN KEY ("id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
