/*
  Warnings:

  - You are about to drop the column `userId` on the `Election` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Election" DROP CONSTRAINT "Election_userId_fkey";

-- AlterTable
ALTER TABLE "Election" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_ElectionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ElectionToUser_AB_unique" ON "_ElectionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ElectionToUser_B_index" ON "_ElectionToUser"("B");

-- AddForeignKey
ALTER TABLE "_ElectionToUser" ADD CONSTRAINT "_ElectionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionToUser" ADD CONSTRAINT "_ElectionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
