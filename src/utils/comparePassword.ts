import bcryptjs from 'bcryptjs'
export interface IUser extends Document {
    _id: any;
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>
  }
  
const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  };
  
  const comparePassword = async (candidatePassword: string, user: any ): Promise<boolean> => {
    if (!user) {
        return false; // User not found
      }
    return bcryptjs.compare(candidatePassword, user.password);
  };
 
export {hashPassword,comparePassword}  