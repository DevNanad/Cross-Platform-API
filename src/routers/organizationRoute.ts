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

const router = Router();

//create an organization
router.post("/", organizationSchema, validateRequestSchema, createOrg);

//get all organizations
router.get("/", getAllOrg);

//get single organization
router.get("/:id", getAnOrg);

//delete all organizations
router.delete("/", deleteAllOrg);

//delete single organization
router.delete("/:id", deleteAnOrg);

//update single organization
router.patch("/:id", updateAnOrg);

export default router;
