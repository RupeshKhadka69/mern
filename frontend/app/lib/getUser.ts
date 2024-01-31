interface UserData {
    name: string;
    email: string;
    // Add other properties as needed
  }
export const getUserFromLocalStorage = (): UserData | null => {
  // if (typeof window === 'undefined' || !window.localStorage) {
  //   // Check if running on the server or if localStorage is not supported, return null
  //   return null;
  // }
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