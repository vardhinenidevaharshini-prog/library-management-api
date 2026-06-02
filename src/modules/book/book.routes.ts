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

router.get("/", getBooksHandler);

router.get("/:id", getBookByIdHandler);

router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  createBookHandler
);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "LIBRARIAN"),
  updateBookHandler
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  deleteBookHandler
);

export default router;