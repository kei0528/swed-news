/*
  Warnings:

  - A unique constraint covering the columns `[title,pubDate,link]` on the table `news` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "news_title_pubDate_link_key" ON "news"("title", "pubDate", "link");
