
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import galleryRoutes from "./routes/GalleryRoutes.js";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/ErrorMiddleware.js";
import noticeRoutes from "./routes/notice.js";
import authRoutes from "./routes/AuthRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";


// Load environment variables
dotenv.config();
connectDB();
const app = express();

// Middlewares
app.use(cors(
    {
        origin: "https://robo-edge-kkgk.vercel.app/",
        credentials: true
    }
));
app.use(express.json()); // parse JSON request bodies
app.use(helmet()); // security headers
app.use(morgan("dev")); // logging

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/applications", applicationRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});


//error middleware
app.use(errorHandler);

// Connect to MongoDB and start server
//const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//     try {
//         await connectDB(); // await DB connection
//         app.listen(PORT, () => {
//             console.log(`🚀 Server running on port ${PORT}`);
//         });
//     } catch (error) {
//         console.error("Failed to connect to MongoDB", error);
//         process.exit(1);
//     }
// };

 //startServer();

 export default app;