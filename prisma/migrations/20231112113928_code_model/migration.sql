-- CreateTable
CREATE TABLE "Code" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verification_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Code_email_key" ON "Code"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Code_verification_code_key" ON "Code"("verification_code");
