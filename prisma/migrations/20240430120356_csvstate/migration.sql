/*
  Warnings:

  - You are about to drop the column `status` on the `CSVState` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CSVState" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_CSVState" ("created_at", "id", "is_active") SELECT "created_at", "id", "is_active" FROM "CSVState";
DROP TABLE "CSVState";
ALTER TABLE "new_CSVState" RENAME TO "CSVState";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
