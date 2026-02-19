import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/GenerateToken.js";

export const register = async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        user,
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Update only the refreshToken field without triggering full validation
    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.json({
        success: true,
        accessToken,
        refreshToken
    });
};

export const refreshToken = async (req, res) => {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
};
