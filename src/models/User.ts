import "dotenv/config";
import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userType
 *         - userId
 *         - password
 *         - name
 *         - email
 *       properties:
 *         userType:
 *           type: string
 *           description: The type of user (player, coach, or external)
 *           enum:
 *             - player
 *             - coach
 *             - external
 *           example: "player"
 *         userId:
 *           type: string
 *           description: The unique ID of the user
 *           example: "john_doe"
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *           example: "$2b$10$saltsaltedhashedpasswordexample"
 *         name:
 *           type: string
 *           description: The full name of the user
 *           example: "John Doe"
 *         nickname:
 *           type: string
 *           description: The nickname of the user
 *           example: "JD"
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *           example: "john.doe@example.com"
 *         school:
 *           type: string
 *           description: The school the user is affiliated with
 *           example: "Some University"
 *         studentId:
 *           type: string
 *           description: The student's ID
 *           example: "20230001"
 *         positions:
 *           type: array
 *           items:
 *             type: string
 *           description: The positions the user holds
 *           example: ["forward", "midfielder"]
 *         backNumber:
 *           type: string
 *           description: The back number of the player
 *           example: "10"
 *         birth:
 *           type: string
 *           format: date
 *           description: The user's date of birth
 *           example: "1990-01-01"
 *         belong:
 *           type: string
 *           description: The user's affiliation
 *           example: "Developer Team"
 *         joinYear:
 *           type: string
 *           description: The year the user joined
 *           example: "2023"
 */

// 데이터베이스 연결 함수
export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(
      "Could not connect to MongoDB:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
};

// User 모델 인터페이스 정의
export interface IUser extends Document {
  userType: "player" | "coach" | "external";
  userId: string;
  password: string;
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

// User 스키마 정의
const userSchema: Schema<IUser> = new Schema({
  userType: {
    type: String,
    enum: ["player", "coach", "external"],
    required: true,
  },
  userId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String },
  email: { type: String, required: true, unique: true },
  school: { type: String },
  studentId: { type: String },
  positions: [{ type: String }],
  backNumber: { type: String },
  birth: { type: String },
  belong: { type: String },
  joinYear: { type: String },
});

// User 모델 생성
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
