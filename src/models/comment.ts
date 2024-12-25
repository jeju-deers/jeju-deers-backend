import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - postId
 *         - commentId
 *         - name
 *         - belong
 *         - content
 *       properties:
 *         postId:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the related board
 *           example: "64aeb4f5e526b7d8b7c0f4c9"
 *         commentId:
 *           type: number
 *           description: The unique ID of the comment
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the commenter
 *           example: "John Doe"
 *         belong:
 *           type: string
 *           description: The affiliation or role of the commenter
 *           example: "Developer"
 *         content:
 *           type: string
 *           description: The content of the comment
 *           example: "This is a comment."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *           example: "2023-10-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was last updated
 *           example: "2023-10-02T10:00:00Z"
 */

// 댓글 모델 인터페이스 정의
export interface IComment extends Document {
  postId: mongoose.Schema.Types.ObjectId;
  commentId: number;
  name: string;
  belong: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// 댓글 스키마 정의
const CommentSchema: Schema<IComment> = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Board", // 게시물과의 참조
  },
  commentId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  belong: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// `updatedAt` 필드를 자동으로 갱신하는 pre 훅 추가
CommentSchema.pre<IComment>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// 댓글 모델 생성
const Comment: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  CommentSchema
);

export default Comment;
