/*
  Warnings:

  - You are about to drop the column `electionhistoryId` on the `Election` table. All the data in the column will be lost.
  - You are about to drop the `Electionhistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Election" DROP CONSTRAINT "Election_electionhistoryId_fkey";

-- DropForeignKey
ALTER TABLE "Electionhistory" DROP CONSTRAINT "Electionhistory_voterId_fkey";

-- AlterTable
ALTER TABLE "Election" DROP COLUMN "electionhistoryId";

-- DropTable
DROP TABLE "Electionhistory";

-- CreateTable
CREATE TABLE "Id" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Id_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Id_student_id_key" ON "Id"("student_id");
