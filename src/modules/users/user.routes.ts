import { Router } from "express";

import {
  getAllUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "./user.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  getAllUsersHandler
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  createUserHandler
);

/**
 * @swagger
 * /users/{uuid}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put(
  "/:uuid",
  authMiddleware,
  authorize("ADMIN"),
  updateUserHandler
);

/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete(
  "/:uuid",
  authMiddleware,
  authorize("ADMIN"),
  deleteUserHandler
);

export default router;