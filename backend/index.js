import express from "express";
import 'dotenv/config';
import connection from "./models/index.js";
import bookRoute from './routes/bookRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use('/book', bookRoute);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await connection.authenticate();
    connection.sync();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
