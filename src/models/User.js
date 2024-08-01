import "dotenv/config";
import mongoose from "mongoose";
import { sampleUsers } from "../../sampleUser";

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
  userId: { type: String, unique: true, required: true },
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

const insertSampleData = async () => {
  try {
    await connectToDatabase();

    // 데이터베이스에 샘플 데이터가 이미 존재하는지 확인
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany(sampleUsers);
      console.log("샘플 데이터가 삽입되었습니다.");
    } else {
      console.log("데이터베이스에 이미 데이터가 존재합니다.");
    }
  } catch (error) {
    console.error("데이터 삽입 중 오류 발생:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

insertSampleData();

export { connectToDatabase, User };
