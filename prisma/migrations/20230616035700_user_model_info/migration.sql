/*
  Warnings:

  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullname",
ADD COLUMN     "age" TEXT,
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "surname" TEXT,
ADD COLUMN     "year_level" TEXT;
