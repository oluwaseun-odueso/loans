import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwt";

dotenv.config();

const staffDataPath = path.join(__dirname, "../../data/staffs.json");
const staffData = JSON.parse(fs.readFileSync(staffDataPath, "utf-8"));

export class AuthController {
  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const user = staffData.find((u: any) => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = await generateToken({ id: user.id, email: user.email, role: user.role });

    return res.json({ success: true, token });
  }

  logout(req: Request, res: Response): any {
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  }
}

export default new AuthController()