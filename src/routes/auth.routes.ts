import { Router } from "express";

import AuthController from "../controllers/auth.controller"

const {
  login,
  logout
} = AuthController

const router = Router()

router.post("/login", login)
router.post("/logout", logout)

export default router;