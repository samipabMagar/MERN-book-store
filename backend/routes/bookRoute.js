import express from "express";
import bookModel from "../models/bookModel.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  {
    try {
      const data = await bookModel.create(req.body);
      if(data) {
        res.status(200).json({ message: "Book added successfully", data });
      }
      else {
        res.status(400).json({ message: "Failed to add book" });
      }
      
    } catch (error) {
      console.error(error);
    }
  }
});

export default router;
