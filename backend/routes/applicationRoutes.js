import express from "express";
import { protect } from "../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../middlewares/RoleMiddleware.js";
import {
    createApplication,
    getApplications,
    deleteApplication,
} from "../controllers/ApplicationController.js";

const router = express.Router();

// Create application (Public)
router.post("/", createApplication);

// Get all applications (Admin only)
router.get("/", protect, authorizeRoles("admin"), getApplications);

// Delete application (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteApplication);

export default router;
