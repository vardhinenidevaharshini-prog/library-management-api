import { Router } from "express";

import {
  createBorrowRecordHandler,
  getAllBorrowRecordsHandler,
  getBorrowRecordByIdHandler,
  returnBookHandler,
  deleteBorrowRecordHandler,
} from "./borrowRecord.controller";

import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Borrow Records
 *   description: Borrow Record Management APIs
 */

/**
 * @swagger
 * /borrow-records:
 *   post:
 *     summary: Create borrow record
 *     tags: [Borrow Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Borrow record created successfully
 */
router.post(
  "/",
  authMiddleware,
  createBorrowRecordHandler
);

/**
 * @swagger
 * /borrow-records:
 *   get:
 *     summary: Get all borrow records
 *     tags: [Borrow Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Borrow records fetched successfully
 */
router.get(
  "/",
  authMiddleware,
  getAllBorrowRecordsHandler
);

/**
 * @swagger
 * /borrow-records/{id}:
 *   get:
 *     summary: Get borrow record by ID
 *     tags: [Borrow Records]
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
 *         description: Borrow record fetched successfully
 */
router.get(
  "/:id",
  authMiddleware,
  getBorrowRecordByIdHandler
);

/**
 * @swagger
 * /borrow-records/return/{id}:
 *   patch:
 *     summary: Return borrowed book
 *     tags: [Borrow Records]
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
 *         description: Book returned successfully
 */
router.patch(
  "/return/:id",
  authMiddleware,
  returnBookHandler
);

/**
 * @swagger
 * /borrow-records/{id}:
 *   delete:
 *     summary: Delete borrow record
 *     tags: [Borrow Records]
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
 *         description: Borrow record deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteBorrowRecordHandler
);

export default router;