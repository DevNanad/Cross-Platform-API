import { Router } from "express";
import {
  castVote,
  changeFullname,
  changePassword,
  changePicture,
  changePin,
  changeRole,
  changeStudentID,
  checkMobileNumber,
  checkVotersVote,
  confirmMobileNumber,
  deleteVoter,
  forgotPassword,
  forgotPasswordSendOTP,
  forgotPin,
  getAllActivitytypeVoted,
  getAllVoters,
  login,
  primaryLogin,
  recoverAccount,
  register,
  registerCheckId,
  userAnalyticsPastWeek,
} from "../handlers/userHandler";
import { validateRequestSchema } from "../modules/validate-request-schema";
import { loginSchema } from "../validators/loginSchema";
import { registerSchema } from "../validators/registerSchema";
import { isAdmin, protect } from "../modules/auth";
import { castVoteConnections } from "../handlers/userHandler";
import { castConnectionSchema } from "../validators/castConnectionSchema";
import { checkVoterIdSchema } from "../validators/checkVoterIdSchema";
import { changeStudentIdSchema } from "../validators/changeStudentIdSchema";
import { changeStudentFullnameSchema } from "../validators/changeStudentFullnameSchema";
import { changeStudentPictureSchema } from "../validators/changeStudentPictureSchema";
import { changeStudentMobileSchema } from "../validators/checkStudentMobileSchema";
import { confirmStudentMobileSchema } from "../validators/confirmStudentMobileSchema";
import { changStudentPinSchema } from "../validators/changeStudentPinSchema";
import { changeStudentPasswordSchema } from "../validators/changeStudentPasswordSchema";
import { otpsendSchema } from "../validators/otpsendSchema";
import { forgotPasswordSchema } from "../validators/forgotPasswordSchema";
import { forgotPinSchema } from "../validators/forgotPinSchema";
import { idSchema } from "../validators/idSchema";
import { changeRoleSchema } from "../validators/changeRoleSchema";
import rateLimit from "express-rate-limit";
import { recoverAccountSchema } from "../validators/recoverAccountSchema";
const router = Router();

const forgotPasswordSendLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: false,
  legacyHeaders: false,
  message: "Limit: 5 attempts per 5 minutes.",
});

//NOT LOGGED IN
//Register user route
router.post("/register", registerSchema, validateRequestSchema, register);

//Login user route
router.post("/login-primary", loginSchema, validateRequestSchema, primaryLogin);

//Login user route
router.post("/login", loginSchema, validateRequestSchema, login);

//forgot password
router.get(
  "/forgot-password-send",
  forgotPasswordSendLimiter,
  otpsendSchema,
  validateRequestSchema,
  forgotPasswordSendOTP
);

//forgot the actual password
router.patch(
  "/forgot-password",
  forgotPasswordSchema,
  validateRequestSchema,
  forgotPassword
);

//forgot the actual pin code
router.patch("/forgot-pin", forgotPinSchema, validateRequestSchema, forgotPin);

//check id before registration
router.get("/id", idSchema, validateRequestSchema, registerCheckId);

//LOGGED IN
//Delete user route
router.delete("/delete-account/:id", protect, deleteVoter);

//Delete user route ⭐
router.delete("/admin/delete-account/:id", isAdmin, deleteVoter);

//cast vote connections
router.post(
  "/cast-connection",
  protect,
  castConnectionSchema,
  validateRequestSchema,
  protect,
  castVoteConnections,
  castVote
);

//cast vote
router.patch("/cast-vote", protect, castVote);

//get all voter voted candidates
router.get(
  "/check-voters-vote",
  protect,
  checkVoterIdSchema,
  validateRequestSchema,
  checkVotersVote
);

//change student id
router.patch(
  "/change-student-id",
  protect,
  changeStudentIdSchema,
  validateRequestSchema,
  changeStudentID
);

//change student fullname
router.patch(
  "/change-student-fullname",
  protect,
  changeStudentFullnameSchema,
  validateRequestSchema,
  changeFullname
);

//change student profile picture
router.patch(
  "/change-student-picture",
  protect,
  changeStudentPictureSchema,
  validateRequestSchema,
  changePicture
);

//change student role
router.patch(
  "/change-role",
  isAdmin,
  changeRoleSchema,
  validateRequestSchema,
  changeRole
);

//change student mobile (check mobile number and send otp if false)
router.get(
  "/check-mobile-number",
  protect,
  changeStudentMobileSchema,
  validateRequestSchema,
  checkMobileNumber
);

//change student mobile (confirm mobile number otp)
router.post(
  "/confirm-mobile-number",
  protect,
  confirmStudentMobileSchema,
  validateRequestSchema,
  confirmMobileNumber
);

//change student pin number
router.patch(
  "/change-student-pin-number",
  protect,
  changStudentPinSchema,
  validateRequestSchema,
  changePin
);

//change student password
router.patch(
  "/change-student-password",
  protect,
  changeStudentPasswordSchema,
  validateRequestSchema,
  changePassword
);

//recover account
router.patch(
  "/recover-account",
  isAdmin,
  recoverAccountSchema,
  validateRequestSchema,
  recoverAccount
);

//user Analytics ⭐
router.get("/user-analytics", isAdmin, userAnalyticsPastWeek);

//get all voters route ⭐
router.get("/get-all-voters", isAdmin, getAllVoters);

//get voted activities route
router.get("/get-voted-activities", isAdmin, getAllActivitytypeVoted);

export default router;
