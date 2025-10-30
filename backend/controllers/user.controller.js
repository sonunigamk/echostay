import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      res.status(400).json({ message: "User doesn't found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message)
  }
};
