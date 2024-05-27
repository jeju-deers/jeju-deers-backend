import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB: ", error.message);
    process.exit(1);
  }
};

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["player", "coach", "external"],
    required: true,
  },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nickname: String,
  email: { type: String, required: true, unique: true },
  school: String,
  studentId: String,
  positions: [String],
  backNumber: String,
});

const User = mongoose.model("User", userSchema);
export { connectToDatabase, User };
