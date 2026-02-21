import express from "express";
import connection from "./models/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await connection.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
