import bcryptjs from "bcryptjs";
import { Document, Types } from "mongoose";

// Define the IUser interface to represent the structure of a user document
interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}
type NewUserType = Document<unknown, {}, IUser> &
  IUser & { _id: Types.ObjectId };
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

const comparePassword = async (
  candidatePassword: string,
  user: NewUserType
): Promise<boolean> => {
  if (!user) {
    return false; // User not found
  }
  return bcryptjs.compare(candidatePassword, user.password);
};

export { hashPassword, comparePassword };
