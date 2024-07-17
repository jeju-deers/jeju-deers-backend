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

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
