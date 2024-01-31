import { loginUser, getUserProfile, logoutUser } from '@/app/api/api';



export  const login = async (credentials: { email: string; password: string }) => {

    try {
   
      const res =   await loginUser(credentials);
      console.log(res.data.user);
      
     localStorage.setItem("userData",JSON.stringify(res.data.user) )

    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow error to handle in components
    }
    
  };
  

