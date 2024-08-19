import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./models/User.js";
import { signup, login } from "./auth.js";
// import { User } from "./models/User.js";
import {
  board,
  boards,
  createBoard,
  deleteBoard,
  updateBoards,
} from "./Board.js";
import upload from "./multerConfig.js";
import { findUserWithId, updateUser, user } from "./user.js";
import { authenticateToken } from "./sessionCheck.js";

const app = express();
const PORT = process.env.PORT || 3000;

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "DELETE", "UPDATE"],
//   allowHeaders: "Content-Type, Authorization",
// };

// app.use(cors(corsOptions));
// app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// 로그인, 회원가입
app.post("/signup", signup);
app.post("/login", login);

// 회원 정보 요청
app.get("/users", user);
// 단일 회원 요청
app.get("/users/:id", authenticateToken, findUserWithId);
// app.get("/users/:id", findUserWithId);
// 회원 정보 수정
app.put("/users/edit/:id", authenticateToken, updateUser);

// 게시판

// 전체 글 조회
app.get("/boards", boards);
// 단일 게시판 글 조회
app.get("board/:boardId", board);
// 글쓰기
app.post(
  "/boards",
  authenticateToken,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 },
  ]),
  createBoard
);
// 글수정
app.put(
  "/boards/:boardId",
  authenticateToken,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 },
  ]),
  updateBoards
);

// 글삭제
app.delete("/boards/:boardId", authenticateToken, deleteBoard);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
