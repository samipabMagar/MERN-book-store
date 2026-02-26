import { Op } from "sequelize";
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
  async getBookById(req, res) {
    const { id } = req.params;
    if (id) {
      try {
        const book = await bookModel.findByPk(id);
        console.log(book.dataValues);
        if (book) {
          res.status(200).json({ message: "Book found", book });
        } else {
          res.status(404).json({ message: "Book not found" });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(400).json({ message: "Book ID is required" });
    }
  }

  async updateBook(req, res) {
    const { id } = req.params;
    if (id) {
      // console.log(req.body);
      const data = await bookModel.update(req.body, {
        where: { id },
      });
      if (data[0] === 1) {
        res.status(200).json({ message: "Book updated successfully" });
      } else {
        res.status(400).json({ message: "Failed to update book" });
      }
    } else {
      res.status(400).json({ message: "Book ID is required" });
    }
  }

  async deleteBook(req, res) {
    const { id } = req.params;
    if (id) {
      try {
        const data = await bookModel.destroy({
          where: { id },
        });
        if (data === 1) {
          res.status(200).json({ message: "Book deleted successfully" });
        } else {
          res.status(404).json({ message: "Book not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(400).json({ message: "Book ID is required" });
    }
  }

  async searchBook(req, res) {
    const { title } = req.query;
    if (title) {
      try {
        const data = await bookModel.findAll({
          where: {
            [Op.or]: {
              name: {
                [Op.like]: `%${title}%`,
              },
              author: {
                [Op.like]: `%${title}%`,
              },
            },
          },
        });

        if (data.length > 0) {
          res.status(200).json({ message: "Books found", data });
        } else {
          res.status(404).json({ message: "No books found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
