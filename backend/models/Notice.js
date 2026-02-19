import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        image: String,
        mediaItems: [{
            type: { type: String, enum: ['photo', 'video'] },
            url: { type: String, required: true },
            description: { type: String }
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);
