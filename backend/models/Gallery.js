import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ["photo", "video"],
        required: false
    },
    
}, {
    timestamps: true
});

export default mongoose.model("Gallery", gallerySchema);
