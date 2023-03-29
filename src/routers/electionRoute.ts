import {Router} from 'express'
import { createElection, connectOrg } from '../handlers/electionHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { electionSchema } from '../validators/electionSchema'

const router = Router()

router.post('/create', electionSchema, validateRequestSchema, createElection)

router.patch('/connectorg', connectOrg)

export default router