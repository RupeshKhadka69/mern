
"use client"
// Navbar.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { logout } from '../utils/authProvider';
import { toast, ToastContainer } from 'react-toastify';
import { getUserFromLocalStorage } from '../lib/getUser';

const Navbar: React.FC = () => {
  type UserData = {
    name: string;
    email: string;
    // Add other properties as needed
  };
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(getUserFromLocalStorage());
  const [dropdownOpen, setDropdownOpen] = useState(false); // Initialize dropdownOpen state

  const { mutate } = useMutation(logout, {
    onSuccess: async () => {
      handleLogout();
      router.push('/');
    },
  });

  const handleLogout = async () => {
    setUser(null);
    mutate();
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
              <span className="mr-2">Sign In</span>
            )}
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
                    onClick={() => router.push('user/signin')}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push('user/register')}
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
      <ToastContainer />
    </nav>
  );
};

export default Navbar;