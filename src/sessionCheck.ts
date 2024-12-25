import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// 사용자 정의 타입 추가 (JwtPayload 확장)
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

// 인증 미들웨어
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token is missing or expired" });
      return;
    }

    // 토큰 검증
    jwt.verify(token, process.env.JWT_SECRET_KEY || "", (error, user) => {
      if (error) {
        console.error("JWT verification error:", error.message);
        res.status(403).json({ error: "Invalid or expired token" });
        return;
      }

      // 토큰에서 사용자 정보 추가
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(500)
      .json({
        error: "Authentication failed",
        details: error instanceof Error ? error.message : String(error),
      });
  }
};
