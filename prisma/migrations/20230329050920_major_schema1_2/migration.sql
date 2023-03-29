-- DropForeignKey
ALTER TABLE "Ballot" DROP CONSTRAINT "Ballot_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_seatId_fkey";

-- DropForeignKey
ALTER TABLE "Election" DROP CONSTRAINT "Election_electionhistoryId_fkey";

-- DropForeignKey
ALTER TABLE "Electionhistory" DROP CONSTRAINT "Electionhistory_voterId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_electionId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_ballotId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_voterId_fkey";

-- AlterTable
ALTER TABLE "Ballot" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "seatId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Election" ALTER COLUMN "electionhistoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Electionhistory" ALTER COLUMN "voterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "electionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "ballotId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "organizationId" DROP NOT NULL,
ALTER COLUMN "candidateId" DROP NOT NULL,
ALTER COLUMN "voterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Election" ADD CONSTRAINT "Election_electionhistoryId_fkey" FOREIGN KEY ("electionhistoryId") REFERENCES "Electionhistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_ballotId_fkey" FOREIGN KEY ("ballotId") REFERENCES "Ballot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ballot" ADD CONSTRAINT "Ballot_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Electionhistory" ADD CONSTRAINT "Electionhistory_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
