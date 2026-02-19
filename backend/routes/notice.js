import express from "express";
import { upload } from "../middlewares/upload.js";
import { protect } from "../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../middlewares/RoleMiddleware.js";
import {
    createNotice,
    getNotices,
    updateNotice,
    deleteNotice,
} from "../controllers/NoticeController.js";

const router = express.Router();

router.get("/", getNotices);
router.post("/", protect, authorizeRoles("admin"), createNotice);
router.put("/:id", protect, authorizeRoles("admin"), updateNotice);
router.delete("/:id", protect, authorizeRoles("admin"), deleteNotice);

export default router;
