import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/User.js";

const secretKey = "secret";

const signup = async (req, res) => {
  const {
    userType,
    userId,
    password,
    passwordConfirm,
    name,
    nickname,
    email,
    school,
    studentId,
    positions,
    backNumber,
  } = req.body;

  // Check if password and password confirmation match
  if (password !== passwordConfirm) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    let userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // userId 중복제거
    let userIdDuplicate = await User.findOne({ userId });
    if (userIdDuplicate) {
      return res.status(400).json({ msg: "UserId already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const userFields = {
      userType,
      userId,
      password: hashedPassword,
      name,
      nickname,
      email,
    };

    if (userType === "player") {
      userFields.school = school;
      userFields.studentId = studentId;
      userFields.positions = positions;
      userFields.backNumber = backNumber;
    } else if (userType === "coach") {
      userFields.school = school;
      userFields.studentId = studentId;
      userFields.positions = positions;
    }

    user = new User(userFields);

    // Save the user to the database
    await user.save();

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        userId: user.userId,
      },
    };

    jwt.sign(payload, secretKey, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res
        .status(401)
        .json({ error: "아이디 혹은 비밀번호가 유효하지 않습니다." });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ error: "아이디 혹은 비밀번호가 유효하지 않습니다." });
    }
    const token = jwt.sign(
      { userId: user._id, userId: user.userId },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

export { signup, login };
