import prisma from '../db'
const { DateTime } = require('luxon');

export const updateExpiredElections = async () => {
  const now = DateTime.now().setZone('UTC');
  const expiredElections = await prisma.election.findMany({
    where: {
      status: "ongoing",
      endDate: {
        lte: now.toJSDate(),
      },
    },
  });

  for (const election of expiredElections) {
    await prisma.election.update({
      where: { id: election.id },
      data: { status: "ended" },
    });
  }

  console.log(`Updated ${expiredElections.length} expired elections`);
}
