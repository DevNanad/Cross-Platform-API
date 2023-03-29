import {Router} from 'express'
import { createElection, connectOrg } from '../handlers/electionHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectorgSchema } from '../validators/connectorgSchema'
import { electionSchema } from '../validators/electionSchema'

const router = Router()

router.post('/create', electionSchema, validateRequestSchema, createElection)

router.patch('/connectorg', connectorgSchema,validateRequestSchema, connectOrg)

export default router