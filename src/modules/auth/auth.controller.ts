import { Request, Response } from "express";
import { 
    registerUser,
    loginUser,
    generateAccessToken,
    changePassword,
    forgotPassword,
    resetPassword,
 } from "./auth.service";

export const registerHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, role} = req.body;

    const user = await registerUser(
      name,
      email,
      password,
      role,
    );
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const loginHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    const { password: _, ...userWithoutPassword } = result.user;

    res.status(200).json({
        success: true,
        data: userWithoutPassword,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
    });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const refreshTokenHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { refreshToken } = req.body;

    const accessToken =
      await generateAccessToken(
        refreshToken
      );

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};





export const changePasswordHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
  uuid,
  currentPassword,
  newPassword,
} = req.body;

const result =
  await changePassword(
    uuid,
    currentPassword,
    newPassword
  );

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };



  export const forgotPasswordHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { email } = req.body;

      const result =
        await forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: result.message,
        resetToken:
          result.resetToken,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };



  export const resetPasswordHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        token,
        newPassword,
        confirmPassword,
      } = req.body;

      const result =
        await resetPassword(
          token,
          newPassword,
          confirmPassword
        );

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };