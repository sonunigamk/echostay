import getToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate JWT
    const token = await getToken(user._id);

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ erroMessage: error.message });
  }
};

///----Login Controller----////

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = await getToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Respond with user data
    return res.status(200).json({
      message: "Login successfully..!!",
      user,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

///---logout-----///

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    if (token) {
      return res.status(200).json({ message: "Logout successful." });
    } else {
      return res.status(200).json({ message: "Already logged out." });
    }
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
