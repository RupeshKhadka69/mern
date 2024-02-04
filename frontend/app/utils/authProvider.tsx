import { loginUser, getUserProfile, logoutUser, registerUser } from '@/app/api/api';



export  const login = async (credentials: { email: string; password: string }) => {

  try {
    const res = await loginUser(credentials);
    const userData = res.data.user;

    localStorage.setItem("userData", JSON.stringify(userData));

    return userData; // Return user data after successful login
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Rethrow error to handle in components
  }
    
  };
  
  export const register = async (Credential: {email:string, name: string, password: string})=> {
    try {
      await registerUser(Credential);
    } catch (error) {
      console.log("registration failed: ",error);
      throw error;
    }
  }
  export const logout = async ()=> {
       try {
        await logoutUser()
        localStorage.removeItem("userData");
       } catch (error) {
        console.log("registration failed: ",error);
        throw error;
       }
  }

