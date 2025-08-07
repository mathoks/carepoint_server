-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "preferred_products" TEXT[],
    "preferred_location" TEXT[],
    "preferred_language" TEXT NOT NULL,
    "preferred_currency" TEXT NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
