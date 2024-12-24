import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Board",
  }, // 게시물과의 참조
  commentId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  belong: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
