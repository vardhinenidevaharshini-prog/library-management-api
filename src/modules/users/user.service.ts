import prisma from "../../config/prisma";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      uuid: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
};

export const updateUser = async (
  uuid: string,
  data: {
    name?: string;
    email?: string;
    role?: string;
  }
) => {
  return prisma.user.update({
    where: { uuid },
    data,
  });
};

export const deleteUser = async (uuid: string) => {
  return prisma.user.delete({
    where: { uuid },
  });
};