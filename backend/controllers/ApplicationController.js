import Application from "../models/Application.js";

// Create new application
export const createApplication = async (req, res) => {
    try {
        console.log("📝 Creating application with data:", req.body);

        const application = await Application.create({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            course: req.body.course,
            message: req.body.message,
        });

        console.log("✅ Application created successfully:", application);
        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application
        });
    } catch (error) {
        console.error("❌ Error creating application:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit application",
            error: error.message
        });
    }
};

// Get all applications (Admin only)
export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort("-createdAt");
        res.status(200).json({
            success: true,
            applications
        });
    } catch (error) {
        console.error("❌ Error fetching applications:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch applications",
            error: error.message
        });
    }
};

// Delete application (Admin only)
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        });
    } catch (error) {
        console.error("❌ Error deleting application:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete application",
            error: error.message
        });
    }
};
