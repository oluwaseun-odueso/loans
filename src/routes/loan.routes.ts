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
router.get("/:userEmail/get", authenticate, getUserLoans);
router.get("/status", authenticate, getLoansByStatus);
router.delete(
  "/:loanId/delete",
  authenticate,
  authorize(["superAdmin"]),
  deleteLoan
);

export default router;
