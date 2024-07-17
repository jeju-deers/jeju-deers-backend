import express from "express";
import cors from "cors";
import { connectToDatabase } from "./models/User.js";

import { signup, login } from "./auth.js";
import { User } from "./models/User.js";

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
connectToDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// 로그인, 회원가입
app.post("/signup", signup);
app.post("/login", login);

// 회원 정보 요청
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
    console.log(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// 회원 정보 수정
app.put("/users/edit/:id", async (req, res) => {
  const { id } = req.params;
  const {
    userType,
    userId,
    password,
    name,
    nickname,
    email,
    school,
    studentId,
    positions,
    backNumber,
  } = res.body;

  if (
    !userType &&
    !userId &&
    !name &&
    !email &&
    !password &&
    !nickname &&
    !school &&
    !studentId &&
    !positions &&
    !backNumber
  ) {
    return res.status(400).send("하나의 항목이라도 변경되어야 합니다.");
  }
  try {
    const updateData = {};
    if (userType) updateData.userType = userType;
    if (userId) updateData.userId = userId;
    if (password) updateData.password = password;
    if (name) updateData.name = name;
    if (nickname) updateData.nickname = nickname;
    if (email) updateData.email = email;
    if (school) updateData.school = school;
    if (studentId) updateData.studentId = studentId;
    if (positions) updateData.positions = positions;
    if (backNumber) updateData.backNumber = backNumber;
    const updateUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).send("사용자를 찾을 수 없습니다.");
    }
    res.json(updateUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
