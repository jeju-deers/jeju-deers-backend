import express from "express";
import { connectToDatabase } from "./database.js";

import { signup, login } from "./auth.js";

const app = express();
app.use(express.json());
connectToDatabase();

app.post("/signup", signup);
app.post("/login", login);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
