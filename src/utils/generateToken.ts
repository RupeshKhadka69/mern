import jwt from 'jsonwebtoken'
import { Response } from "express";
import dotenv from 'dotenv'
import { Document, Types } from "mongoose";

// Define the IUser interface to represent the structure of a user document
interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}
type NewUserType = Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId; };
dotenv.config();
 
const generateToken = (res:Response,userId:NewUserType) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET as string,{expiresIn:'30d'})
    res.cookie("jwtauth",token, {
        httpOnly: true,
        secure:process.env.NODE_ENV != "development",
        sameSite: "strict",
        maxAge: 30 *24*60*60*1000

    })

}
export default generateToken;