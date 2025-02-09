import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "./models/User";

// 타입 정의
interface SignupRequestBody {
  userType: "player" | "coach" | "external";
  userId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname?: string;
  email: string;
  school?: string;
  studentId?: string;
  positions?: string[];
  backNumber?: string;
  birth?: string;
  belong?: string;
  joinYear?: string;
}

interface LoginRequestBody {
  userId: string;
  password: string;
}

// 공통 에러 핸들러
const handleError = (
  res: Response,
  message: string,
  error: unknown,
  statusCode = 500
) => {
  console.error(`${message}:`, error);
  res.status(statusCode).json({
    error: message,
    details: error instanceof Error ? error.message : String(error),
  });
};

// 회원가입 함수
export const signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
): Promise<void> => {
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
    birth,
    belong,
    joinYear,
  } = req.body;

  if (password !== passwordConfirm) {
    res.status(400).json({ error: "Passwords do not match" });
    return;
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      const msg =
        existingUser.email === email
          ? "Email already exists"
          : "UserId already exists";
      res.status(400).json({ error: msg });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userFields = {
      userType,
      userId,
      password: hashedPassword,
      name,
      nickname,
      email,
      school: ["player", "coach"].includes(userType) ? school : undefined,
      studentId: ["player", "coach"].includes(userType) ? studentId : undefined,
      positions: ["player", "coach"].includes(userType) ? positions : undefined,
      backNumber: userType === "player" ? backNumber : undefined,
      birth,
      belong,
      joinYear,
    };

    const user = new User(userFields);
    await user.save();

    const payload = {
      user: {
        id: user.id,
        userId: user.userId,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          handleError(res, "Failed to generate token", err);
          return;
        }
        res.status(201).json({ token, message: "Signup successful" });
      }
    );
  } catch (error) {
    handleError(res, "Failed to signup user", error);
  }
};

// 로그인 함수
export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      res.status(401).json({ error: "Invalid user ID or password" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ error: "Invalid user ID or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.userId },
      process.env.JWT_SECRET_KEY || "",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        userType: user.userType,
        belong: user.belong,
      },
    });
  } catch (error) {
    handleError(res, "Failed to login user", error);
  }
};
