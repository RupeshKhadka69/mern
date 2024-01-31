"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Define the type for user data
// Define the type for user data
import { getUserFromLocalStorage } from '@/app/lib/getUser';
interface UserData {
    name: string;
    email: string;
    // Add other properties as needed
  }
  
  const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserData|string | null>(null);
  
    useEffect(() => {
      const userInfoString = getUserFromLocalStorage();
    //  console.log(userInfoString.n);
     
      
      if (userInfoString) {
        try {
            setUser(userInfoString);
          
          setUser(userInfoString);
        } catch (error) {
          console.error('Error parsing user data:', error);
          router.push('/user/signin');
        }
      } else {
        router.push('/user/signin');
      }
    }, [router]);
  
    if (!user) {
      return null;
    }
  
    return (
      <div>
       {typeof user === 'string' ? (
      // Render loading state or redirect message
      <p>Loading...</p>
    ) : (
      // Render profile data
      <>
        <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        {/* Render other profile information */}
      </>
    )}
      </div>
    );
  };
  
  export default ProfilePage;