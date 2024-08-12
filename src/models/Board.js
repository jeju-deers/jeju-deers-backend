const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: String, required: true },
  images: [{ type: String }],
  videos: [{ type: String }],
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

module.exports = mongoose.model("Board", BoardSchema);
