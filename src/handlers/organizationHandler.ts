import prisma from "../db";

//CREATE ORGANIZATION
export const createOrg = async (req, res) => {
  try {
    const org = await prisma.organization.create({
      data: {
        org_name: req.body.org_name,
        logo_url: req.body.logo_url,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        ballots: {
          create: [{}],
        },
      },
    });
    res.json(org);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//GET ALL
export const getAllOrg = async (req, res) => {
  try {
    const allOrganizations = await prisma.organization.findMany();

    res.json(allOrganizations);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//GET ALL DISCONNECTED BALLOT
export const getAllNullOrg = async (req, res) => {
  try {
      const nullOrg = await prisma.organization.findMany({
          where: {
              electionId: null
          }
      })

      res.json(nullOrg)
  } catch (error) {
      res.status(404).json({error: error.message})
  }
}

//GET SINGLE
export const getAnOrg = async (req, res) => {
  try {
    const findOrganization = await prisma.organization.findUnique({
      where: {
        id: req.params.id,
      },
    });

    //check if the organization exist
    if (!findOrganization) throw new Error("Organization not Found");

    //return json message
    res.json(findOrganization);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//DELETE ALL
export const deleteAllOrg = async (req, res) => {
  try {
    const deletedOrganizations = await prisma.organization.deleteMany({});

    //invoke delete all organizations
    deletedOrganizations;

    //return json message
    res.json({ message: "All Organizations Deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//DELETE SINGLE
export const deleteAnOrg = async (req, res) => {
  try {
    const findOrganization = await prisma.organization.findUnique({
      where: {
        id: req.params.id,
      },
    });
    //check if the organization exist
    if (!findOrganization) throw new Error("Organization not Found");

    const deletedOrganization = await prisma.organization.delete({
      where: { id: req.params.id },
    });

    //invoke delete organization
    deletedOrganization;

    //return json message
    res.json({ message: "Organization Deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//UPDATE SINGLE
export const updateAnOrg = async (req, res) => {
  try {
    const findOrganization = await prisma.organization.findUnique({
      where: {
        id: req.params.id,
      },
    });
    //check if the organization exist
    if (!findOrganization) throw new Error("Organization not Found");

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: req.params.id,
      },
      data: {
        org_name: req.body.org_name,
        logo_url: req.body.logo_url,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      },
    });

    //invoke update organization
    updatedOrganization

    //return json message
    res.json({ message: "Organization Updated" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


//GET ALL BALLOT BASE ON ORG ID
export const orgBallot = async (req, res) => {
  try {
      const ballot = await prisma.ballot.findFirst({
          where: {
              organizationId: req.params.id
          },
          include: {
              seats: true
          }
      });
      if (!ballot) {
          throw new Error(`Ballot not found for organization ID ${req.params.id}`);
      }
      res.status(200).json(ballot);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
};
