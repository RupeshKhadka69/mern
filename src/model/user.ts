import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});





const User = mongoose.model<IUser>('User',userSchema);

export default User;