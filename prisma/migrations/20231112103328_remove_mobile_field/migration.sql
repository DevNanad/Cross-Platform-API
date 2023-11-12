/*
  Warnings:

  - You are about to drop the column `mobile_number` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_mobile_number_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mobile_number";
