import asyncHandler from "express-async-handler"
import User from "../model/user"
import bcryptjs from 'bcryptjs'

const registerUser = asyncHandler(async (req,res,next)=> {
    const {name,password,email} = req.body
    const user =  await User.findOne({email});
    if(user){
        res.status(400).json({message: "user already exits.."})
        throw new Error("User already exits")
    }
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);
        const newUser = new User({name, password:hashPassword,email})
        await newUser.save() ;
        res.status(201).json({
            message: "Registration successful",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        next(err);
    }      

})
export {registerUser}