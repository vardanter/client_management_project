-- CreateTable
CREATE TABLE "Client" (
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
    "magnitogorsk" TEXT,
    "chelyabinsk" TEXT,
    "yuzhnouralsk" TEXT,
    "female" TEXT,
    "male" TEXT,
    "predictions" TEXT,
    "propensity_to_churn" TEXT,
    "ranking" TEXT,
    "phone_number" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_user_id_key" ON "Client"("user_id");
