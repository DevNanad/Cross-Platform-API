/*
  Warnings:

  - Added the required column `mobile_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pin_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullname" TEXT,
ADD COLUMN     "mobile_number" TEXT NOT NULL,
ADD COLUMN     "pin_number" TEXT NOT NULL,
ADD COLUMN     "profile_picture" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
