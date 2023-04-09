import {Router} from 'express'
import { castVote, changeFullname, changePicture, changeStudentID, checkMobileNumber, checkVotersVote, confirmMobileNumber, deleteVoter, login, register } from '../handlers/userHandler';
import { validateRequestSchema } from '../modules/validate-request-schema';
import { loginSchema } from '../validators/loginSchema';
import { registerSchema } from '../validators/registerSchema';
import { protect } from '../modules/auth';
import { castVoteConnections } from '../handlers/userHandler';
import { castConnectionSchema } from '../validators/castConnectionSchema';
import { checkVoterIdSchema } from '../validators/checkVoterIdSchema';
import { changeStudentIdSchema } from '../validators/changeStudentIdSchema';
import { changeStudentFullnameSchema } from '../validators/changeStudentFullnameSchema';
import { changeStudentPictureSchema } from '../validators/changeStudentPictureSchema';
import { changeStudentMobileSchema } from '../validators/checkStudentMobileSchema';
import { confirmStudentMobileSchema } from '../validators/confirmStudentMobileSchema';

const router = Router()

//Register user route
router.post('/register', registerSchema, validateRequestSchema, register )

//Login user route
router.post('/login', loginSchema, validateRequestSchema, login )

//Delete user route
router.delete('/delete-account/:id', protect, deleteVoter)

//cast vote connections
router.post('/cast-connection', protect, castConnectionSchema, validateRequestSchema, protect, castVoteConnections, castVote)

//cast vote
router.patch('/cast-vote', protect, castVote)

//get all voter voted candidates
router.get('/check-voters-vote', protect, checkVoterIdSchema, validateRequestSchema, checkVotersVote)

//change student id
router.patch('/change-student-id', protect, changeStudentIdSchema, validateRequestSchema, changeStudentID)

//change student fullname
router.patch('/change-student-fullname', protect, changeStudentFullnameSchema, validateRequestSchema, changeFullname)

//change student fullname
router.patch('/change-student-picture', protect,changeStudentPictureSchema, validateRequestSchema, changePicture)

//change student mobile (check mobile number and send otp if false)
router.get('/check-mobile-number', protect, changeStudentMobileSchema, validateRequestSchema, checkMobileNumber)

//change student mobile (confirm mobile number otp)
router.post('/confirm-mobile-number', protect, confirmStudentMobileSchema, validateRequestSchema, confirmMobileNumber)

export default router