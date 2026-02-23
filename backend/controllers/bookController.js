import bookModel from "../models/bookModel.js";

export default class BookController {
  // Add a new book
  async addBook(req, res) {
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
  }

  // Get book by ID
  async getBookById (req, res) {
    const {id} = req.params;
    if(id) {
      try {
        const book = await bookModel.findByPk(id);
        console.log(book);
        if(book) {
          res.status(200).json({ message: "Book found", book });
        }
        else {
          res.status(404).json({ message: "Book not found" });
        }
      }
      catch(error){
        console.error(error);
      }
    }
    else {
      res.status(400).json({ message: "Book ID is required" });
    }
  }
}
