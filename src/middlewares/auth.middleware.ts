import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import fs from "fs";
import path from "path";

const STAFF_FILE_PATH = path.join(__dirname, "../data/staff.json");

const getStaffs = (): any[] => {
  const data = fs.readFileSync(STAFF_FILE_PATH, "utf-8");
  return JSON.parse(data);
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.staff = decoded;

    const staffs = getStaffs();
    const staff = staffs.find((staff) => staff.email === decoded.email);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    next();
  } catch (error: any) {
    console.error("Authentication error:", error);
    return res.status(498).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const authorize = (roles: ("staff" | "admin" | "superAdmin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.staff) {
      return res.status(403).json({
        success: false,
        message: "No user found",
      });
    }

    if (!roles.includes(req.staff.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }

    next();
  };
};
