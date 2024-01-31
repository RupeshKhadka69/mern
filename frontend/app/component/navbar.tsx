
"use client"
// Navbar.tsx

import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  name: string;
  email: string;
  // Add other properties as needed
}

interface NavbarProps {
  user: UserData | null;
};

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
//  useEffect(() => {
  
//  }, [third])
 

  const handleLogout = async () => {
    // Perform logout logic here
    router.push('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold">Your Website</div>
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center text-white focus:outline-none">
            {user ? (
              <span className="mr-2">Welcome, {user.name}</span>
            ) : (
              <span className="mr-2">Sign In</span> // Conditional rendering here
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => router.push('/signin')}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push('/register')}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;