import User, { IUser } from "../model/user";
import { comparePassword, hashPassword } from "../utils/comparePassword";
import { Request, Response, NextFunction } from "express";
import generateToken from "../utils/generateToken";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}
// this is the route for register user
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ message: "user already exits.." });
    throw new Error("User already exits");
  }
  try {
    const newHashPassword = await hashPassword(password);
    const newUser = new User({ name, password: newHashPassword, email });
    await newUser.save();
    generateToken(res, newUser);
    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not fountd" });
    }

    const passwordMatch = await comparePassword(password, user);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
   const token =  generateToken(res, user._id);

    // User and password match
    res.status(200).json({
      message: "sucess",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // Handle any unexpected errors
    next(error);
  }
};
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AuthenticatedRequest).user;

  // Ensure that the user is defined before accessing its properties
  if (!user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Return user profile data
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  res.cookie("jwtauth", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "log out sucessful" });
};

// const getUserProfile =

export { registerUser, authUser, getProfile, logoutUser };
