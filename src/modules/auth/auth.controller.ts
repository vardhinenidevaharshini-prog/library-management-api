import { Request, Response } from "express";
import { 
    registerUser,
    loginUser,
    generateAccessToken,
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