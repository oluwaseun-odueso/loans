import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      staff?;
      admin?;
      superAdmin;
    }
  }
}
