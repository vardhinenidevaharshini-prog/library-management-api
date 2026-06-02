import { Router } from "express";

import {
  createBookHandler,
  getBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} from "./book.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book Management APIs
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN", "STUDENT"),
  getBooksHandler
);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN", "STUDENT"),
  getBookByIdHandler
);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  createBookHandler
);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  updateBookHandler
);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  deleteBookHandler
);

export default router;