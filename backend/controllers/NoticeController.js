import Notice from "../models/Notice.js";

// CREATE (Admin Only)
export const createNotice = async (req, res) => {
    try {
        console.log("📝 Creating notice with data:", req.body);

        const noticeData = {
            title: req.body.title,
            message: req.body.message,
            mediaItems: req.body.mediaItems || [],
            createdBy: req.user._id,
        };

        // Handle file upload if present
        if (req.file) {
            noticeData.image = req.file.path;
        }

        console.log("📝 Processed notice data:", noticeData);

        const notice = await Notice.create(noticeData);
        console.log("✅ Notice created successfully:", notice);

        res.status(201).json({ success: true, notice });
    } catch (error) {
        console.error("❌ Error creating notice:", error);
        console.error("❌ Error details:", error.stack);
        res.status(500).json({
            success: false,
            message: "Failed to create notice",
            error: error.message
        });
    }
};

// UPDATE (Admin Only)
export const updateNotice = async (req, res) => {
    try {
        console.log("📝 Updating notice with ID:", req.params.id);
        console.log("📝 Update data:", req.body);

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        // Check if user owns this notice
        if (notice.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this notice"
            });
        }

        const updatedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                message: req.body.message,
                mediaItems: req.body.mediaItems || notice.mediaItems,
            },
            { new: true, runValidators: true }
        );

        console.log("✅ Notice updated successfully:", updatedNotice);
        res.json({
            success: true,
            notice: updatedNotice
        });
    } catch (error) {
        console.error("❌ Error updating notice:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update notice",
            error: error.message
        });
    }
};

// DELETE (Admin Only)
export const deleteNotice = async (req, res) => {
    try {
        console.log("🗑️ Deleting notice with ID:", req.params.id);

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        // Check if user owns this notice
        if (notice.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this notice"
            });
        }

        await Notice.findByIdAndDelete(req.params.id);
        console.log("✅ Notice deleted successfully");
        res.json({
            success: true,
            message: "Notice deleted successfully"
        });
    } catch (error) {
        console.error("❌ Error deleting notice:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete notice",
            error: error.message
        });
    }
};

// GET ALL (Pagination + Search)
export const getNotices = async (req, res) => {
    try {
        console.log("📋 Fetching notices...");
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const search = req.query.search || "";

        console.log("📋 Query params:", { page, limit, search });

        const query = {
            title: { $regex: search, $options: "i" },
        };

        console.log("📋 MongoDB query:", query);

        const notices = await Notice.find(query)
            .populate("createdBy", "name email")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort("-createdAt");

        console.log("📋 Found notices:", notices.length);

        const total = await Notice.countDocuments(query);

        const response = {
            success: true,
            total,
            page,
            pages: Math.ceil(total / limit),
            notices,
        };

        console.log("📋 Sending response:", response);
        res.json(response);
    } catch (error) {
        console.error("❌ Error fetching notices:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch notices",
            error: error.message
        });
    }
};
