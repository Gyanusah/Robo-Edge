import Gallery from "../models/Gallery.js";
import fs from "fs";


// Upload gallery file
export const uploadGallery = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
        let fileUrl, fileType, title;

        // Handle actual file upload
        if (req.file) {
            title = req.body.title;
            // Better MIME type detection for images
            const mimeType = req.file.mimetype.toLowerCase();
            if (mimeType.startsWith('video/')) {
                fileType = "video";
            } else if (mimeType.startsWith('image/')) {
                fileType = "photo";
            } else {
                fileType = "photo"; // Default to photo for unknown types
            }
            fileUrl = `/uploads/${req.file.filename}`;
        }
        // Handle base64 imageUrl fallback
        else if (req.body.imageUrl) {
            title = req.body.title;
            fileType = req.body.type || "photo";
            fileUrl = req.body.imageUrl;
        }
        else {
            return res.status(400).json({ message: "File is required" });
        }

        const newItem = await Gallery.create({
            title,
            fileUrl,
            fileType
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all gallery items
export const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update gallery item
export const updateGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const item = await Gallery.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Gallery item not found" });
        }

        // Update title if provided
        if (title) {
            item.title = title;
        }

        await item.save();
        res.status(200).json({ message: "Gallery item updated", item });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete gallery item
export const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Gallery.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Gallery item not found" });
        }

        // Remove file from uploads folder
        fs.unlinkSync(`.${item.fileUrl}`);

        await Gallery.findByIdAndDelete(id);

        res.status(200).json({ message: "Gallery item deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
