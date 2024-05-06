import express from "express";
import {
  createContact,
  getContactUs,
  updateContactUs,
  deleteContactUs,
} from "../controllers/contact.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getContactUs);
router.patch("/:id", updateContactUs);
router.delete("/:id", deleteContactUs);

export default router;
