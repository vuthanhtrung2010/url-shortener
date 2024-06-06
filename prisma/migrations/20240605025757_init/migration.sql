-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "aliases" TEXT[],

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_link_key" ON "Links"("link");
