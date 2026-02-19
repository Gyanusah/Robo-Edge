import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadGallery, getGallery, deleteGallery, updateGallery } from "../controllers/GalleryControllers.js";

const router = express.Router();

// Upload a photo/video
router.post("/upload", upload.single("file"), uploadGallery);

// Get all gallery items
router.get("/", getGallery);

// Update gallery item
router.put("/:id", updateGallery);

// Delete a gallery item
router.delete("/:id", deleteGallery);

export default router;
