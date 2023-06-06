import {Router} from 'express'
import { candidateToSeat, createCandidate, deleteACandidate, disconnectCandidateFromSeat, getACandidate, getAllCandidate, getAllNullCandidate, posCandidate, updateACandidate } from '../handlers/candidateHandler'
import { candidateSchema } from '../validators/candidateSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectcandidateSchema } from '../validators/connectcandidateSchema'
import { isAdmin } from '../modules/auth'

const router = Router()

//create a candidate ⭐
router.post('/', isAdmin, candidateSchema, validateRequestSchema, createCandidate)

//get all candidates ⭐
router.get('/', isAdmin, getAllCandidate)

//get all disconnected candidates ⭐
router.get('/null', isAdmin, getAllNullCandidate)

//get candidates base on seat id
router.get('/seat-candidate/:id', isAdmin, posCandidate)

//get single candidate ⭐
router.get('/:id', isAdmin, getACandidate)

//delete single candidate ⭐
router.delete('/:id', isAdmin, deleteACandidate)

//update single candidate ⭐
router.patch('/:id', isAdmin, candidateSchema, validateRequestSchema, updateACandidate)

//connect candidate to seat ⭐
router.patch('/connect/candidate-seat', isAdmin,connectcandidateSchema, validateRequestSchema, candidateToSeat)

//disconnect candidate from seat ⭐
router.patch('/disconnect/candidate-seat', isAdmin,connectcandidateSchema, validateRequestSchema, disconnectCandidateFromSeat)

export default router