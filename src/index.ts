import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./models/User";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import boardRoutes from "./routes/boardRoutes";
import commentRoutes from "./routes/commentRoutes";
import adminRoutes from "./routes/adminRoutes";
import gameScheduleRoutes from "./routes/gameScheduleRoutes";
import { setupSwagger } from "./swagger"; // Swagger 설정 파일 import

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 데이터베이스 연결
connectToDatabase();

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// 라우트 설정
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/comments", commentRoutes);
app.use("/admin", adminRoutes);
app.use("/game-schedules", gameScheduleRoutes);

setupSwagger(app);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
