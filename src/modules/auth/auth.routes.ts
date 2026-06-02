import { Router } from "express";
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

export default router;