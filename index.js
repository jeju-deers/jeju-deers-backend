import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database.js";

import { signup, login } from "./auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "DELETE", "UPDATE"],
//   allowHeaders: "Content-Type, Authorization",
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
connectToDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

app.post("/signup", signup);
app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${port}`);
});
