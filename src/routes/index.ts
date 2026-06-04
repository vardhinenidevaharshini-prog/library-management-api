import { Router } from "express";
import bookRoutes from "../modules/book/book.routes";
import authRoutes from "../modules/auth/auth.routes";
import memberRoutes from "../modules/member/member.routes";
import borrowRecordRoutes from "../modules/borrowRecord/borrowRecord.routes";
import userRoutes from "../modules/users/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/members", memberRoutes);
router.use("/borrow-records", borrowRecordRoutes);
router.use("/users", userRoutes);


export default router;