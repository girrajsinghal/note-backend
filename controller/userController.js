import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateToken from "../middleware/generateToken.js";

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ user: { id: newUser._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("token", { httpOnly: true, secure: false })
      .status(200)
      .json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
