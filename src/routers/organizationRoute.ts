import { Router } from "express";
import {
  createOrg,
  deleteAllOrg,
  deleteAnOrg,
  getAllOrg,
  getAnOrg,
  updateAnOrg,
} from "../handlers/organizationHandler";
import { organizationSchema } from "../validators/organizationSchema";
import { validateRequestSchema } from "../modules/validate-request-schema";
import { isAdmin } from "../modules/auth";

const router = Router();

//create an organization ***
router.post("/", isAdmin, organizationSchema, validateRequestSchema, createOrg);

//get all organizations ***
router.get("/", isAdmin, getAllOrg);

//get single organization ***
router.get("/:id", isAdmin, getAnOrg);

//delete all organizations ***
router.delete("/", isAdmin, deleteAllOrg);

//delete single organization ***
router.delete("/:id", isAdmin, deleteAnOrg);

//update single organization ***
router.patch("/:id", isAdmin, organizationSchema, validateRequestSchema, updateAnOrg);

export default router;
