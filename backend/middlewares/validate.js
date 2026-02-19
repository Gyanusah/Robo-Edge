export const validateNotice = (req, res, next) => {
    const { title, message } = req.body;

    if (!title || !message) {
        return res.status(400).json({
            success: false,
            message: "Title and Message are required",
        });
    }

    next();
};
