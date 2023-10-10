import prisma from '../db'


//CREATE
export const createElection = async (req, res) => {
    try {
        const election = await prisma.election.create({
            data: {
                title: req.body.title,
                banner: req.body.banner,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
            }
        })
        res.json(election)
    } catch (error) {
        res.status(400).json({error})
    }
}

//GET SINGLE
export const getAnElection = async (req, res) => {
    try {
        const findElection = await prisma.election.findUnique({
            where: {
                id: req.params.id
            },
            include: { organizations: true}
        })

        //check if the election exist
        if(!findElection) throw new Error("Election not Found");

        //return json message
        res.json(findElection)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//GET ALL
export const getAllElection = async (req, res) => {
    try {
        const allElections = await prisma.election.findMany()

        allElections

        res.json(allElections)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

//GET ALL ORGANIZATION BASE ON ELECTION ID
export const electionOrg = async (req, res) => {
    try {
        const orgs = await prisma.organization.findMany({
            where: {
                electionId: String(req.params.id)
            },
            include: {
                ballots: true,
                votes: true
            }
        });
        if (!orgs) {
            throw new Error(`Organizations not found for Election ID ${String(req.params.id)}`);
        }
        res.status(200).json(orgs);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
  };

//GET ALL UPCOMING ELECTION
export const getUpcomingElection = async (req, res) => {
    try {
        const upcoming = await prisma.election.findMany({
            where: {
                status: 'upcoming'
            }
        })

        if(upcoming.length === 0) throw new Error("No Upcoming Election")

        res.json(upcoming)

    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//GET ALL ONGOING ELECTION
export const getOngoingElection = async (req, res) => {
    try {
        const ongoing = await prisma.election.findMany({
            where: {
                status: 'ongoing'
            },
            include: { 
                organizations: {
                    include: {
                        ballots: true,
                        votes: true
                    }
                }
            }
        })
        res.json(ongoing)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//GET ALL ENDED ELECTION
export const getEndedElection = async (req, res) => {
    try {
        const ended = await prisma.election.findMany({
            where: {
                status: 'ended'
            }
        })

        if(ended.length === 0) throw new Error("No Ended Election")

        res.json(ended)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//CHECK IF USER VOTED TO A ORGANIZATION
export const checkIfVotedToOrg= async (req, res) => {
    try {
        const params = req.query
        const uniqueRecords = await prisma.vote.findMany({
            where: {
              organizationId: String(params.organizationId),
              voterId: String(params.student_id)
            },
          });
        res.json(uniqueRecords)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


//UPDATE SINGLE
export const updateAnElec = async (req, res) => {
    try {
      const findElections = await prisma.election.findUnique({
        where: {
          id: req.params.id,
        },
      });
      //check if the organization exist
      if (!findElections) throw new Error("Election not Found");
  
      const updatedElection = await prisma.election.update({
        where: {
          id: req.params.id,
        },
        data: {
          title: req.body.title,
          banner: req.body.banner,
          startDate: new Date(req.body.start_date),
          endDate: new Date(req.body.end_date),
        },
      })
  
      //return json message
      res.json({ message: "Election Updated" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

//UPDATE TO UPCOMING
export const toUpcoming = async (req, res) => {
    try {
        const findElection = await prisma.election.findUnique({
            where: {
              id: req.params.id,
            },
          });
          //check if the election exist
          if (!findElection) throw new Error("Election not Found");


        const toUp = await prisma.election.update({
            where: {
                id: req.params.id
            },
            data: {
                status: "upcoming"
            }
        })

        //invoke upcoming request
        toUp

        res.json({message: "Updated to Upcoming!"})
    } catch (error) {
        res.status(404).json({error: "No Upcoming Election"})
    }
}


//UPDATE TO ONGOING
export const toOngoing = async (req, res) => {
    try {
        const findElection = await prisma.election.findUnique({
            where: {
              id: req.params.id,
            },
          });
          //check if the election exist
          if (!findElection) throw new Error("Election not Found");


        const toOn = await prisma.election.update({
            where: {
                id: req.params.id
            },
            data: {
                status: "ongoing"
            }
        })

        //invoke ongoing request
        toOn

        res.json({message: "Updated to Ongoing!"})
    } catch (error) {
        res.status(404).json({error: "No Ongoing Election"})
    }
}


//UPDATE TO ENDED
export const toEnded = async (req, res) => {
    try {
        const findElection = await prisma.election.findUnique({
            where: {
              id: req.params.id,
            },
          });
          //check if the election exist
          if (!findElection) throw new Error("Election not Found");


        const toEn = await prisma.election.update({
            where: {
                id: req.params.id
            },
            data: {
                status: "ended"
            }
        })

        //invoke ended request
        toEn

        res.json({message: "Updated to Ended!"})
    } catch (error) {
        res.status(404).json({error: "No Ended Election"})
    }
}

//DELETE SINGLE
export const deleteAnElection = async (req, res) => {
    try {
        const findElection = await prisma.election.findUnique({
            where: {
                id: req.params.id
            }
        })
        //check if the election exist
        if(!findElection) throw new Error("Election not Found");
        
        const deletedElection = await prisma.election.delete({
            where: {id: req.params.id}
        })

        //invoke delete election
        deletedElection

        //return json message
        res.json({message: "Election Deleted"})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

//DELETE ALL
export const deleteAllElection = async (req, res) => {
    try {
        const deletedElections = await prisma.election.deleteMany({})

        //invoke delete all elections
        deletedElections

        //return json message
        res.json({message: "All Election Deleted"})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


//CONNECT ORG TO ELECTION
export const connectOrg = async (req, res) => {
    try {

        //check if the passed election id exists in the database
        const electionExists = await prisma.election.findUnique({
            where: {
                id: req.body.election_id
            }
          })
        
        if(!electionExists) throw new Error("Election not found");
        
        //check if the passed organization id exists in the database
        const orgExists = await prisma.organization.findUnique({
            where: {
                id: req.body.org_id
            }
          })
        
        if(!orgExists) throw new Error("Organization not found");
        


        const connectOrgToElection = await prisma.election.update({
            where:{
                id: req.body.election_id
            },
            data: {
                organizations: {
                    connect: {
                        id: req.body.org_id
                    }
                }
            }
        })
        res.json({ message: "Organization Connected to Election"})
    } catch (error) {
        res.status(404).json({error: error.message})       
    }
}

//DISCONNECT ORG TO ELECTION
export const disconnectOrg = async (req, res) => {
    try {
        // check if the passed election id exists in the database
        const electionExists = await prisma.election.findUnique({
            where: {
                id: req.body.election_id
            }
        })

        if (!electionExists) throw new Error("Election not found");

        // check if the passed organization id exists in the database
        const orgExists = await prisma.organization.findUnique({
            where: {
                id: req.body.org_id
            }
        })

        if (!orgExists) throw new Error("Organization not found");

        const disconnectOrgFromElection = await prisma.election.update({
            where: {
                id: req.body.election_id
            },
            data: {
                organizations: {
                    disconnect: {
                        id: req.body.org_id
                    }
                }
            }
        })

        res.json({ message: "Organization Disconnected from Election"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//CONNECT PARTICIPATED ELECTION TO USER FOR HISTORY
export const electionToUser = async (req, res) => {
    try {

        //check if the passed election id exists in the database
        const electionExists = await prisma.election.findUnique({
            where: {
                id: req.body.election_id
            }
          })
        
        if(!electionExists) throw new Error("Election not found");
        
        //check if the passed user id exists in the database
        const userExists = await prisma.user.findUnique({
            where: {
                student_id: req.body.student_id
            }
        })
        
        if(!userExists) throw new Error("Voter not found");

        
        const connectElectionToVoter = await prisma.user.update({
            where:{
                student_id: req.body.student_id
            },
            data: {
                elections: {
                    connect: {
                        id: req.body.election_id
                    }
                }
            }
        })

        res.json({ message: "Election Connected to Voter"} )
        
    } catch (error) {
        res.status(404).json({error: error.message})       
    }
}

//GET ALL ELECTION BASED ON USERID
export const getElectionByUserId = async (req, res) => {
    try {
        //check if the passed user id exists in the database
        const userExists = await prisma.user.findUnique({
            where: {
                student_id: String(req.params.id)
            }
        })
        
        if(!userExists) throw new Error("Voter not found");

        const electionByUserId = await prisma.user.findUnique({
            where: {
                student_id: String(req.params.id)
            },
            include: {
                elections: true
            }
        })
        res.json(electionByUserId.elections)

    } catch (error) {
        res.status(404).json({error: error.message})
    }
}