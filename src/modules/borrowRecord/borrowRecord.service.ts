import prisma from "../../config/prisma";

export const createBorrowRecord = async (data: {
  bookId: number;
  memberId: number;
}) => {
  return prisma.borrowRecord.create({
    data,
    include: {
      book: true,
      member: true,
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