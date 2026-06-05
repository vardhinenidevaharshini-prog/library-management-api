import { Request, Response } from "express";
import { 
    createBook, 
    getBooks, 
    getBookById,
    updateBook,
    deleteBook,
} from "./book.service";

export const createBookHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, author, isbn } = req.body;

    const book = await createBook(
      title,
      author,
      isbn
    );

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Failed to fetch books",
    error,
  });

  }
};

export const getBooksHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const books = await getBooks();

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error("GET BOOKS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error,
    });
  }
};

export const getBookByIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id as string);

    const book = await getBookById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
    });
  }
};

export const updateBookHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const { title, author, isbn } = req.body;

    const updatedBook = await updateBook(
      id,
      title,
      author,
      isbn
    );

    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update book",
    });
  }
};


export const deleteBookHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await deleteBook(id);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } 
    catch (error: any) {
  return res.status(400).json({
    success: false,
    message: error.message,
  });
}
  };