import express from "express";
import { protect } from "../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../middlewares/RoleMiddleware.js";
import {
    sendMessage,
    getMessages,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/messages", protect, authorizeRoles("admin"), getMessages);

export default router;
