import prisma from "../../config/prisma";

export const createBorrowRecord =
  async (
    bookId: number,
    memberId: number
  ) => {

    const existingBorrow =
      await prisma.borrowRecord.findFirst({
        where: {
          bookId,
          status: "BORROWED",
        },
      });

    if (existingBorrow) {
      throw new Error(
        "Book is already borrowed"
      );
    }

    return await prisma.borrowRecord.create({
      data: {
        bookId,
        memberId,
      },
    });
  };

export const getAllBorrowRecords = async () => {
  return prisma.borrowRecord.findMany({
    include: {
      book: true,
      member: true,
    },
  });
};

export const getBorrowRecordById = async (
  id: number
) => {
  return prisma.borrowRecord.findUnique({
    where: { id },
    include: {
      book: true,
      member: true,
    },
  });
};

export const returnBook = async (
  id: number
) => {
  return prisma.borrowRecord.update({
    where: { id },
    data: {
      status: "RETURNED",
      returnDate: new Date(),
    },
  });
};

export const deleteBorrowRecord = async (
  id: number
) => {
  return prisma.borrowRecord.delete({
    where: { id },
  });
};