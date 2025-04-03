import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const loansFilePath = path.join(__dirname, "../data/loans.json");
let loans = JSON.parse(fs.readFileSync(loansFilePath, "utf-8"));

class LoanController {
  getLoans(req: Request, res: Response) {
    const userRole = req.user?.role;

    const filteredLoans = loans.map((loan: any) => ({
      id: loan.id,
      applicantEmail: loan.applicantEmail,
      amount: loan.amount,
      status: loan.status,
      maturityDate: loan.maturityDate,
      ...(userRole === "admin" || userRole === "superadmin"
        ? { totalLoan: loan.totalLoan }
        : {}),
    }));

    return res.status(200).json({ success: true, data: filteredLoans });
  }

  getLoansByStatus(req: Request, res: Response) {
    const { status } = req.query;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status query parameter is required",
      });
    }

    const filteredLoans = loans.filter((loan: any) => loan.status === status);

    return res.status(200).json({ success: true, data: filteredLoans });
  }

  getUserLoans(req: Request, res: Response) {
    const { userEmail } = req.params;
    const userLoans = loans.filter(
      (loan: any) => loan.applicantEmail === userEmail
    );

    return res.status(200).json({
      success: true,
      data: userLoans.length ? userLoans : [],
    });
  }

  getExpiredLoans(req: Request, res: Response) {
    const expiredLoans = loans.filter(
      (loan: any) => new Date(loan.maturityDate) < new Date()
    );

    return res.status(200).json({ success: true, data: expiredLoans });
  }

  deleteLoan(req: Request, res: Response) {
    if (req.user?.role !== "superadmin") {
      return res
        .status(403)
        .json({ success: false, message: "Only superadmin can delete loans" });
    }

    const { loanId } = req.params;
    const loanIndex = loans.findIndex((loan: any) => loan.id === loanId);

    if (loanIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }

    loans.splice(loanIndex, 1);
    fs.writeFileSync(loansFilePath, JSON.stringify(loans, null, 2));

    return res
      .status(200)
      .json({ success: true, message: "Loan deleted successfully" });
  }
}

export default new LoanController();
