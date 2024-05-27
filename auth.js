import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./database.js";

const secretKey = "secret";

const signup = async (req, res) => {
  const {
    userType,
    username,
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
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const userFields = {
      userType,
      username,
      password: hashedPassword,
      name,
      nickname,
      email,
    };

    if (userType === "player" || userType === "coach") {
      userFields.school = school;
      userFields.studentId = studentId;
      userFields.positions = positions;
      userFields.backNumber = backNumber;
    }

    user = new User(userFields);

    // Save the user to the database
    await user.save();

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
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
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

export { signup, login };
