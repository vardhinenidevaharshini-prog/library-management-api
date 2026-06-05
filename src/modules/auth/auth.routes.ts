import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  refreshTokenHandler,
  changePasswordHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "./auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerHandler);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginHandler);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post("/refresh-token", refreshTokenHandler);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change Password
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.post(
  "/change-password",
  changePasswordHandler
);


/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot Password
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Reset token generated
 */
router.post(
  "/forgot-password",
  forgotPasswordHandler
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post(
  "/reset-password",
  resetPasswordHandler
);


export default router;