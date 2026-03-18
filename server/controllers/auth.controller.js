import User from "../models/user.model.js";
import StatusCodes from "http-status-codes";

const register = async (req, res) => {
  console.log("entering register");
  console.log("body:", req.body);

  try {
    const { username, email, password } = req.body;

    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already in use" });
    }

    const user = await User.create({ username, email, password });
    const token = user.generateToken();

    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();

    res.status(StatusCodes.OK).json({
      message: "login successful",
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};
export { register, login };
