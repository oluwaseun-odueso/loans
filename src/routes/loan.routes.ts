import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import LoanController from "../controllers/loan.controller";

const {
  getLoans,
  getLoansByStatus,
  getUserLoans,
  getExpiredLoans,
  deleteLoan,
} = LoanController;

const router = Router();

router.get("/", authenticate, getLoans);
router.get("/expired", authenticate, getExpiredLoans);
router.get("/:userEmail", authenticate, getUserLoans);
router.get("/status", authenticate, getLoansByStatus);
router.delete(
  "/:loanId",
  authenticate,
  authorize(["superAdmin"]),
  deleteLoan
);

export default router;
