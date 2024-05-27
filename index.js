import express from "express";
import { connectToDatabase } from "./database.js";

import { signup, login } from "./auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

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
