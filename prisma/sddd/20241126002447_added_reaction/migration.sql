-- CreateTable
CREATE TABLE "reaction" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reaction_user_id_key" ON "reaction"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "unik_reactions" ON "reaction"("id", "category_id", "user_id");

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_id_category_id_user_id_fkey" FOREIGN KEY ("id", "category_id", "user_id") REFERENCES "prod_reviews"("id", "category_id", "user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
