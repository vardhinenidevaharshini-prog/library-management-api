/* import { Router } from "express";
import { 
    registerHandler,
    loginHandler,
    refreshTokenHandler,
 } from "./auth.controller";

const router = Router();

router.post("/register", registerHandler);

router.post("/login", loginHandler);

router.post(
  "/refresh-token",
  refreshTokenHandler
);

export default router;*/




import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  refreshTokenHandler,
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

export default router;