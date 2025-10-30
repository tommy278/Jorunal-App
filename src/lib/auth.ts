import jwt, {SignOptions} from "jsonwebtoken";
import { cookies } from "next/headers";
import { jwtVerify } from 'jose';

type JWTPayload = {
  id: string
  email: string
  name?: string
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN: string = process.env.REFRESH_EXPIRES_IN || "1h";
const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export function signToken(payload: object, type: "access" | "refresh") {
    if (type === "access") {
      return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: ACCESS_EXPIRES_IN} as SignOptions)
    } 
    if (type === "refresh") {
      return jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: REFRESH_EXPIRES_IN} as SignOptions)
    }

    throw new Error("Invalid token type");
}

export async function getUserFromServer() {
  const token = (await cookies()).get("access_token")?.value
  let payload = null;
  
    if (token) {
      try {
        const { payload: verified } = await jwtVerify(token, secret);
        payload = verified;
        return payload as JWTPayload;
      } catch (err) {
        console.log("JWT verify failed:", err);
      }
    }
}
