"use client"
interface UserData {
    name: string;
    email: string;
    // Add other properties as needed
  }
export const getUserFromLocalStorage = (): UserData | null => {

    const userInfoString = localStorage.getItem('userData');
    if (userInfoString) {
      try {
        const userInfo: UserData = JSON.parse(userInfoString);
        return userInfo;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  };  