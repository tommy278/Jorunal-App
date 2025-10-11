import jwt, {SignOptions} from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN: string = process.env.REFRESH_EXPIRES_IN || "1h";

export function signToken(payload: object, type: "access" | "refresh") {
    if (type === "access") {
      return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: ACCESS_EXPIRES_IN} as SignOptions)
    } 
    if (type === "refresh") {
      return jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: REFRESH_EXPIRES_IN} as SignOptions)
    }

    throw new Error("Invalid token type");
}
