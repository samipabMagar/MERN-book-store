import express from "express";
import bookModel from "../models/bookModel.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/add", upload.single("image"), async (req, res) => {
  {
    try {
      const data = await bookModel.create({
        ...req.body,
        image: req.file.filename,
      });
      if (data) {
        res.status(200).json({ message: "Book added successfully", data });
      } else {
        res.status(400).json({ message: "Failed to add book" });
      }
    } catch (error) {
      console.error(error);
    }
  }
});

export default router;
