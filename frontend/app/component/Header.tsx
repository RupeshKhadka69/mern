"use client"
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { getUserFromLocalStorage } from '../lib/getUser';

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const user = getUserFromLocalStorage();


  return (
    <div>
      <Navbar user={user}  />
    </div>
  );
};

export default Header;
