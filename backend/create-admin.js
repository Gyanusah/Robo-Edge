import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@company.com' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email: admin@company.com');
            console.log('Password: password123');
            return;
        }

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@company.com',
            password: 'password123',
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@company.com');
        console.log('Password: password123');
        console.log('Role:', adminUser.role);

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
