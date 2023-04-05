-- CreateEnum
CREATE TYPE "Status" AS ENUM ('upcoming', 'ongoing', 'ended');

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'upcoming';

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "logo_url" DROP NOT NULL;
