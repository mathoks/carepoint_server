-- AlterTable
ALTER TABLE "product" ADD COLUMN     "orderQt" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "variant_prodimage" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "variant_prodimage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variant_attribute" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "variant_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock_qt" INTEGER NOT NULL,
    "order_qt" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "variant_attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "variant_attribute_id_key" ON "variant_attribute"("id");

-- AddForeignKey
ALTER TABLE "variant_prodimage" ADD CONSTRAINT "variant_prodimage_id_fkey" FOREIGN KEY ("id") REFERENCES "variant_attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute" ADD CONSTRAINT "variant_attribute_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
