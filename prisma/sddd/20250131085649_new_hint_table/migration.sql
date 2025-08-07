-- CreateTable
CREATE TABLE "Hint" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Hint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hint" ADD CONSTRAINT "Hint_id_fkey" FOREIGN KEY ("id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
