import express from "express";
import upload from "../middlewares/uploadMIddleware.js";
import BookController from "../controllers/bookController.js";

const router = express.Router();

const bookController = new BookController();

router.post("/add", upload.single("image"), bookController.addBook);

router.get("/:id", bookController.getBookById);

router.put('/update/:id', bookController.updateBook);

router.delete('/delete/:id', bookController.deleteBook);

router.get("/search/all", bookController.searchBook)
export default router;
