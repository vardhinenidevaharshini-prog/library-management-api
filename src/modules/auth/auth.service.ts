import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

 const accessToken = jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET as string,
  {
    expiresIn: "30m",
  }
);

const refreshToken = jwt.sign(
  {
    userId: user.id,
  },
  process.env.REFRESH_TOKEN_SECRET as string,
  {
    expiresIn: "7d",
  }
);

return {
  user,
  accessToken,
  refreshToken,
};
}


export const generateAccessToken = async (
  refreshToken: string
) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as any;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30m",
      }
    );

    return accessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};


export const changePassword = async (
  uuid: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
  where: {
    uuid,
  },
});

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error(
      "Current password is incorrect"
    );
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      uuid
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message:
      "Password changed successfully",
  };
};


export const forgotPassword = async (
  email: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  const resetTokenExpiry =
    new Date(Date.now() + 15 * 60 * 1000);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  return {
    message: "Reset token generated",
    resetToken,
  };
};


export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {

  if (
    newPassword !== confirmPassword
  ) {
    throw new Error(
      "Passwords do not match"
    );
  }

  const user =
    await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

  if (!user) {
    throw new Error(
      "Invalid or expired token"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await prisma.user.update({
    where: {
      uuid: user.uuid,
    },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return {
    message:
      "Password reset successfully",
  };
};