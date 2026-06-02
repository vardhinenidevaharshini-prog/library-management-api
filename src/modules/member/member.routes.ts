import { Router } from "express";

import {
  createMembersHandler,
  getAllMembersHandler,
  getMemberByIdHandler,
  updateMemberHandler,
  deleteMemberHandler,
} from "./member.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member Management APIs
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Member created successfully
 */
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  createMembersHandler
);

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Members fetched successfully
 */
router.get(
  "/",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  getAllMembersHandler
);

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Members]
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
 *         description: Member fetched successfully
 */
router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  getMemberByIdHandler
);


/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update member
 *     tags: [Members]
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
 *         description: Member updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  updateMemberHandler
);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete member
 *     tags: [Members]
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
 *         description: Member deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  deleteMemberHandler
);

export default router;