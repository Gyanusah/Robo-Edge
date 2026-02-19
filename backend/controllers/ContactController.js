import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
