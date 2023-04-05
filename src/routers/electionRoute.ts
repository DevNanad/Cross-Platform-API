import {Router} from 'express'
import { createElection, connectOrg, getAllElection, deleteAnElection, deleteAllElection, getAnElection, getUpcomingElection, getOngoingElection, getEndedElection, toUpcoming, toOngoing, toEnded } from '../handlers/electionHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectorgSchema } from '../validators/connectorgSchema'
import { electionSchema } from '../validators/electionSchema'

const router = Router()

//create an election
router.post('/', electionSchema, validateRequestSchema, createElection)

//connect org to election
router.patch('/org-election', connectorgSchema,validateRequestSchema, connectOrg)

//get single election
router.get('/:id', getAnElection)

//get all elections
router.get('/', getAllElection)

//delete single election
router.delete('/:id', deleteAnElection)

//delete all election
router.delete('/', deleteAllElection)

//upcoming election
router.get('/status/upcoming', getUpcomingElection)

//ongoing election
router.get('/status/ongoing', getOngoingElection)

//ended election
router.get('/status/ended', getEndedElection)

//update to upcoming
router.patch('/status/to-upcoming/:id', toUpcoming)

//update to ongoing
router.patch('/status/to-ongoing/:id', toOngoing)

//update to ended
router.patch('/status/to-ended/:id', toEnded)

export default router