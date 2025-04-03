import express from "express";

const router = express.Router()

import authRoutes from "./auth.routes"
import loanRoutes from "./loan.routes"

router.use("/auth", authRoutes)
router.use("/loans", loanRoutes)

export default router;