// import mongoose from "mongoose";
// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config();

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDB = async () => {
//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false, // Prevent mongoose from buffering commands before connection
//             useNewUrlParser: true, // Modern URL parser
//             useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
//         };

//         if (!process.env.MONGODB_URI) {
//             throw new Error("MONGODB_URI environment variable is not defined");
//         }

//         cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongooseInstance) => {
//             console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
//             return mongooseInstance;
//         });
//     }

//     try {
//         cached.conn = await cached.promise;
//     } catch (error) {
//         cached.promise = null;
//         throw error;
//     }

//     return cached.conn;
// };

// export default connectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in .env");
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false, // optional, safe
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Stop server if DB connection fails
    }
};

export default connectDB;
