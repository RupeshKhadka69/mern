import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../model/user";
import dotenv from 'dotenv'
dotenv.config()
// Extend the Express Request interface to include a user property
interface AuthenticatedRequest extends Request {
    user?: IUser;
}
const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.jwtauth;
    if (token) {
        try {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            const user = await User.findById(decodeToken.userId).select('-password');
            
            // Check if user exists
            if (!user) {
                throw new Error('User not found');
            }

            // Cast user to IUser
            req.user = user.toObject() as IUser;
            
            next();
        } catch (err) {
            // Handle verification errors
            console.error('Token verification error:', err);
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};
export default authenticate