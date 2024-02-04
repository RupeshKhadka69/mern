"use client"
import React from 'react';
import Navbar from './navbar';

const Header: React.FC = () => {
  return (
    <div>
      <Navbar /> {/* No need to pass props */}
    </div>
  );
};

export default Header;