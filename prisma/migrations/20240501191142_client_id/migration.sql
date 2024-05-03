/*
  Warnings:

  - You are about to alter the column `user_id` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "credit_score" TEXT,
    "age" TEXT,
    "tenure" TEXT,
    "balance" TEXT,
    "products" TEXT,
    "credit_card" TEXT,
    "is_active_member" TEXT,
    "salary" TEXT,
    "churn" TEXT,
    "city" TEXT,
    "gender" TEXT,
    "predictions" TEXT,
    "propensity_to_churn" TEXT,
    "ranking" TEXT,
    "phone_number" TEXT
);
INSERT INTO "new_Client" ("age", "balance", "churn", "city", "credit_card", "credit_score", "gender", "is_active_member", "phone_number", "predictions", "products", "propensity_to_churn", "ranking", "salary", "tenure", "user_id") SELECT "age", "balance", "churn", "city", "credit_card", "credit_score", "gender", "is_active_member", "phone_number", "predictions", "products", "propensity_to_churn", "ranking", "salary", "tenure", "user_id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
