/*
  Warnings:

  - You are about to drop the column `tags` on the `Ballot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_voterId_fkey";

-- AlterTable
ALTER TABLE "Ballot" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "student_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;
