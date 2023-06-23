/*
  Warnings:

  - Added the required column `banner` to the `Election` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "candidate_status" "Status" NOT NULL DEFAULT 'upcoming';

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "org_status" "Status" NOT NULL DEFAULT 'upcoming';

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "position_order" TEXT,
ADD COLUMN     "position_status" "Status" NOT NULL DEFAULT 'upcoming',
ADD COLUMN     "voted_candidates" TEXT[];

-- AddForeignKey
ALTER TABLE "Election" ADD CONSTRAINT "Election_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;
