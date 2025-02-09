import mongoose, { Schema, Document, Model } from "mongoose";
/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - content
 *         - owner
 *         - type
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated ID of the board
 *           example: 1
 *         title:
 *           type: string
 *           description: The title of the board
 *           example: "Team Meeting Schedule"
 *         content:
 *           type: string
 *           description: The content of the board
 *           example: "Details about the upcoming team meeting."
 *         owner:
 *           type: string
 *           description: The owner of the board
 *           example: "John Doe"
 *         views:
 *           type: number
 *           description: The number of views
 *           example: 123
 *         belong:
 *           type: string
 *           description: The department or group the board belongs to
 *           example: "Engineering Team"
 *         type:
 *           type: string
 *           description: The type of the board
 *           enum:
 *             - WORKOUT_SCHEDULES
 *             - TEAM_BOARD
 *             - COACH_BOARD
 *             - STAFF_BOARD
 *             - PLAYBOOK
 *             - MEMBERSHIP_FEE
 *             - NEWS
 *             - GUEST_BOARD
 *             - MEDIA
 *             - SUPPORT
 *           example: "TEAM_BOARD"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the board was created
 *           example: "2023-10-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the board was last updated
 *           example: "2023-10-02T10:00:00Z"
 */

// Board 모델 인터페이스 정의
export interface IBoard extends Document {
  id: number;
  title: string;
  content: string;
  owner: string;
  views: number;
  type: string;
  belong?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Board 스키마 정의
const BoardSchema: Schema<IBoard> = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: String, required: true },
  views: { type: Number, default: 0 },
  belong: { type: String },
  type: {
    type: String,
    enum: [
      "WORKOUT_SCHEDULES",
      "TEAM_BOARD",
      "COACH_BOARD",
      "STAFF_BOARD",
      "PLAYBOOK",
      "MEMBERSHIP_FEE",
      "NEWS",
      "GUEST_BOARD",
      "MEDIA",
      "SUPPORT",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// `updatedAt` 필드를 자동으로 갱신하는 pre 훅
BoardSchema.pre<IBoard>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Board 모델 생성
const Board: Model<IBoard> = mongoose.model<IBoard>("Board", BoardSchema);

export default Board;
