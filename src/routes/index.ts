import { Router } from "express";
import bookRoutes from "../modules/book/book.routes";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.use("/books", bookRoutes);
router.use("/auth", authRoutes);

export default router;