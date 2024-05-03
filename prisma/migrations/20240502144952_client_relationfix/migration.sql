/*
  Warnings:

  - Added the required column `client_id` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "before_state" TEXT,
    "current_state" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "History_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("before_state", "created_at", "current_state", "id", "user_id") SELECT "before_state", "created_at", "current_state", "id", "user_id" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
