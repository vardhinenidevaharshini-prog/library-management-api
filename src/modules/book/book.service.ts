import prisma from "../../config/prisma";

export const createBook = async (
  title: string,
  author: string,
  isbn: string
) => {
  const book = await prisma.book.create({
    data: {
      title,
      author,
      isbn,
    },
  });

  return book;
};

export const getBooks = async () => {
  const books = await prisma.book.findMany();

  return books;
};

export const getBookById = async (id: number) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return book;
};

export const updateBook = async (
  id: number,
  title: string,
  author: string,
  isbn: string
) => {
  const book = await prisma.book.update({
    where: {
      id,
    },
    data: {
      title,
      author,
      isbn,
    },
  });

  return book;
};

export const deleteBook = async (id: number) => {
  const borrowRecord =
    await prisma.borrowRecord.findFirst({
      where: {
        bookId: id,
      },
    });

  if (borrowRecord) {
    throw new Error(
      "Cannot delete book with borrow history"
    );
  }

  return await prisma.book.delete({
    where: {
      id,
    },
  });
};