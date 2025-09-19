/*
  Warnings:

  - A unique constraint covering the columns `[OrderID,user_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_item_unique_key" ON "public"."orders"("OrderID", "user_id");
