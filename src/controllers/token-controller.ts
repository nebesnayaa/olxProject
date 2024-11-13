import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import { Token } from "../models/token-model.js";
import { addDays } from "date-fns";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret";
const TOKEN_EXPIRATION = "1h";
const REFRESH_TOKEN_EXPIRATION = "7d";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Додаємо властивість user до запиту
    }
  }
}

export class TokenController {
  static async verifyAccessToken (req: Request, res: Response, next: NextFunction) 
  :Promise<any> {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({ message: 'Access token is missing' });
    }
    jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: 'Invalid or expired token' });
  
      try {
        const user = await User.findByPk(decoded?.id); // Шукаємо користувача за ID з токена
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        res.locals.user = user.login;
        next();
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  }

  static async generateToken(user: any, res: Response) {
    const accessToken = jwt.sign({ id: user.id, login: user.login, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    const expiresAt = addDays(new Date(), 7);
  
    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    await TokenController.updateOrCreateRefreshToken(user.id, refreshToken, expiresAt);
  }

  static async updateOrCreateRefreshToken(userId: number, refreshToken: string, expiresAt: Date) {
    try {
      const tokenRecord = await Token.findOne({ where: { user_id: userId } });

      if (tokenRecord) {
        await Token.update({  
            refresh_token: refreshToken,
            expires_at: expiresAt
          }, {  where: { user_id: userId } }
        );
      } else {
        await Token.create({ 
          refresh_token: refreshToken, 
          expires_at: expiresAt, 
          user_id: userId 
        });
      }
    } catch (error) {
      console.error('Error updating/creating refresh token:', error);
    }
  }

  static async generatePasswordResetToken (email: string)  {
    const payload = { email };
    const resetToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    return resetToken;
  }

}