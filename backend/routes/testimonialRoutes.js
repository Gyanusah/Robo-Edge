import express from "express";
import { protect } from "../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../middlewares/RoleMiddleware.js";
import {
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
} from "../controllers/TestimonialController.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", protect, authorizeRoles("admin"), createTestimonial);
router.put("/:id", protect, authorizeRoles("admin"), updateTestimonial);
router.delete("/:id", protect, authorizeRoles("admin"), deleteTestimonial);

export default router;
