import {Router} from 'express'
import { createElection, connectOrg, getAllElection, deleteAnElection, deleteAllElection, getAnElection, getUpcomingElection, getOngoingElection, getEndedElection, toUpcoming, toOngoing, toEnded } from '../handlers/electionHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectorgSchema } from '../validators/connectorgSchema'
import { electionSchema } from '../validators/electionSchema'
import { isAdmin, protect } from '../modules/auth'

const router = Router()

//create an election ***
router.post('/', isAdmin, electionSchema, validateRequestSchema, createElection)

//connect org to election ***
router.patch('/org-election', isAdmin,connectorgSchema,validateRequestSchema, connectOrg)

//get single election ***
router.get('/:id', isAdmin, getAnElection)

//get all elections ***
router.get('/', isAdmin, getAllElection)

//delete single election ***
router.delete('/:id', isAdmin, deleteAnElection)

//delete all election ***
router.delete('/', isAdmin, deleteAllElection)

//upcoming election ***
router.get('/status/upcoming', isAdmin, getUpcomingElection)

//ongoing election 
router.get('/status/ongoing', protect, getOngoingElection)

//ended election
router.get('/status/ended', protect, getEndedElection)

//update to upcoming ***
router.patch('/status/to-upcoming/:id', isAdmin, toUpcoming)

//update to ongoing ***
router.patch('/status/to-ongoing/:id', isAdmin, toOngoing)

//update to ended ***
router.patch('/status/to-ended/:id', isAdmin, toEnded)

export default router