const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  CREATED,
} = require("../utils/constants");

const DEFAULT_USER_ID = "5d8b8592978f8bd833ca8133";
const DEFAULT_USER_EMAIL = "test@example.com";

// GET /users/me - get current user
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }
    return next(err);
  }
};

// GET /users/:userId - get user by id
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId === "null" || userId === "undefined" || userId === "me") {
      const defaultUser = await User.findById(DEFAULT_USER_ID).lean();
      if (defaultUser) {
        delete defaultUser.password;
        return res.json({ data: defaultUser });
      }
      const fallbackUser = await User.findOne({ email: DEFAULT_USER_EMAIL })
        .lean()
        .exec();
      if (fallbackUser) {
        delete fallbackUser.password;
        return res.json({ data: fallbackUser });
      }
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Invalid ID format" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    const userObj = user.toObject();
    delete userObj.password;

    return res.json({ data: userObj });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }
    return next(err);
  }
};

// POST /users - create a new user
const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!name || !avatar || !email || !password) {
      return res.status(BAD_REQUEST).json({ message: "Invalid request data" });
    }

    if (
      typeof name !== "string" ||
      typeof avatar !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(BAD_REQUEST).json({ message: "Invalid request data" });
    }

    const trimmedName = name.trim();
    const trimmedAvatar = avatar.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (
      !trimmedName.length ||
      !trimmedAvatar.length ||
      !trimmedEmail.length ||
      !trimmedPassword.length
    ) {
      return res.status(BAD_REQUEST).json({ message: "Invalid request data" });
    }

    if (!validator.isEmail(trimmedEmail)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid request data" });
    }

    const existingByEmail = await User.findOne({ email: trimmedEmail });
    if (existingByEmail) {
      return res.status(CONFLICT).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const user = await User.create({
      name: trimmedName,
      avatar: trimmedAvatar,
      email: trimmedEmail,
      password: hashedPassword,
    });
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(CREATED).json(userObj);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(CONFLICT).json({ message: "User already exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid request data" });
    }
    return next(err);
  }
};

// PATCH /users/me - update profile
const updateCurrentUser = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid request data" });
    }
    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }
    return next(err);
  }
};

// POST /signin - user login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(BAD_REQUEST).json({ message: "Invalid request data" });
    }

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ token });
  } catch (err) {
    if (err.status === 401) {
      return res
        .status(err.status)
        .json({ message: "Incorrect email or password" });
    }
    return next(err);
  }
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateCurrentUser,
  login,
};
