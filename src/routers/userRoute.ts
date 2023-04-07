import {Router} from 'express'
import { castVote, checkVotersVote, deleteVoter, login, register } from '../handlers/userHandler';
import { validateRequestSchema } from '../modules/validate-request-schema';
import { loginSchema } from '../validators/loginSchema';
import { registerSchema } from '../validators/registerSchema';
import { protect } from '../modules/auth';
import { castVoteConnections } from '../handlers/userHandler';
import { castConnectionSchema } from '../validators/castConnectionSchema';
import { checkVoterIdSchema } from '../validators/checkVoterIdSchema';

const router = Router()

//Register user route
router.post('/register', registerSchema, validateRequestSchema, register )

//Login user route
router.post('/login', loginSchema, validateRequestSchema, login )

//Delete user route
router.delete('/delete-account/:id', protect, deleteVoter)

//cast vote connections
router.post('/cast-connection', castConnectionSchema, validateRequestSchema, protect, castVoteConnections, castVote)

//cast vote
router.patch('/cast-vote', castVote)

//get all voter voted candidates
router.get('/check-voters-vote', checkVoterIdSchema, validateRequestSchema, checkVotersVote)

export default router