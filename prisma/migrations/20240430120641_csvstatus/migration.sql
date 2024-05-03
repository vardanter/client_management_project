/*
  Warnings:

  - You are about to drop the `CSVState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CSVState";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Csvstatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);
