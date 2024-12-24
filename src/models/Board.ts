import mongoose from "mongoose";

const { Schema } = mongoose;

const BoardSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: String, required: true },
  // images: [{ type: String }],
  // videos: [{ type: String }],
  views: { type: Number, default: 0 },
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
      "SUPPROT",
    ],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// updatedAt 필드를 자동으로 갱신하는 pre 훅
BoardSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Board = mongoose.model("Board", BoardSchema);

export default Board;
