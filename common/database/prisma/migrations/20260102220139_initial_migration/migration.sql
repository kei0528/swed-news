-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "pubDate" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "html" TEXT,
    "thumbnail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_link_key" ON "news"("link");

-- CreateIndex
CREATE INDEX "news_pubDate_idx" ON "news"("pubDate");

-- CreateIndex
CREATE INDEX "news_createdAt_idx" ON "news"("createdAt");
