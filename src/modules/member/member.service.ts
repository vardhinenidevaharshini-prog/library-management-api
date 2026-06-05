import prisma from "../../config/prisma";

export const createMember = async (data: {
  name: string;
  email: string;
  phone: string;
}) => {
  return prisma.member.createMany({
    data,
  });
};

export const getAllMembers = async () => {
  return prisma.member.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getMemberById = async (id: number) => {
  return prisma.member.findUnique({
    where: { id },
  });
};

export const updateMember = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
  }
) => {
  return prisma.member.update({
    where: { id },
    data,
  });
};

export const deleteMember = async (
  id: number
) => {
  const borrowRecord =
    await prisma.borrowRecord.findFirst({
      where: {
        memberId: id,
      },
    });

  if (borrowRecord) {
    throw new Error(
      "Cannot delete member with borrow history"
    );
  }

  return await prisma.member.delete({
    where: {
      id,
    },
  });
};