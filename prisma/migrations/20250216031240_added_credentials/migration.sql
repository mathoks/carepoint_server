-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_accessToken_key" ON "credentials"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_refreshToken_key" ON "credentials"("refreshToken");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_id_fkey" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
