const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!name || !avatar || !email || !password) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    if (
      typeof name !== "string" ||
      typeof avatar !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Invalid request data" });
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
      return res.status(400).json({ message: "Invalid request data" });
    }

    if (!validator.isEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const existingByEmail = await User.findOne({ email: trimmedEmail });
    if (existingByEmail) {
      return res.status(409).json({ message: "User already exists" });
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
    return res.status(201).json(userObj);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid request data" });
    }
    return next(err);
  }
};
