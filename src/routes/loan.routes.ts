import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import LoanController from "../controllers/loan.controller"

const {
  getLoans,
  getLoansByStatus,
  getUserLoans,
  getExpiredLoans,
  deleteLoan
  
} = LoanController

const router = Router()

router.post("/", getLoans)
router.post("/expired", getExpiredLoans)
router.get("/:userEmail/get", authenticate, getUserLoans);
router.delete("/:loanId/delete", authenticate, authorize(["superadmin"]), deleteLoan);

export default router;