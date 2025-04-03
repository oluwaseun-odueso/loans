import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import fs from "fs";
import path from "path";

const staffsFilePath = path.resolve("data", "staffs.json");

const staffData = JSON.parse(fs.readFileSync(staffsFilePath, "utf-8"));


export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    const staff = staffData.find((staff: any) => staff.email === decoded.email);

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

export const authorize = (roles: ("staff" | "admin" | "superAdmin")[]): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: "No user found",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }

    next();
  };
};
