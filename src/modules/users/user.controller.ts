import { Request, Response } from "express";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./user.service";

export const getAllUsersHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUserHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await createUser(
      name,
      email,
      password,
      role
    );

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateUserHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const uuid = req.params.uuid as string;

    const user = await updateUser(
      uuid,
      req.body
    );

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const uuid = req.params.uuid as string;

    await deleteUser(uuid);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};