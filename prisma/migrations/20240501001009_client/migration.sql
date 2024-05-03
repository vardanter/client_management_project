/*
  Warnings:

  - You are about to drop the column `chelyabinsk` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `female` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `magnitogorsk` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `male` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `yuzhnouralsk` on the `Client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "user_id" TEXT NOT NULL,
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
INSERT INTO "new_Client" ("age", "balance", "churn", "credit_card", "credit_score", "is_active_member", "phone_number", "predictions", "products", "propensity_to_churn", "ranking", "salary", "tenure", "user_id") SELECT "age", "balance", "churn", "credit_card", "credit_score", "is_active_member", "phone_number", "predictions", "products", "propensity_to_churn", "ranking", "salary", "tenure", "user_id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_user_id_key" ON "Client"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
