"use client"
// Login.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/app/utils/authProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/user/profile');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/auth', { email, password });
      toast.success('Login successful');
      await login({ email, password });
      router.push('/user/profile');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed');
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h2 className='text-xl'>Sign In</h2>
      <form onSubmit={handleSubmit} className='w-[400px]'>
        <div className='m-2 grid'>
          <label className='text-sm'>Email</label>
          <input className='px-4 py-1 border-black border-2' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email..' />
        </div>
        <div className='m-2 grid'>
          <label className='text-sm'>Password</label>
          <input className='px-4 py-1 border-black border-2' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password..' />
        </div>
        <button type='submit' className='btn border-2 border-black py-0.5'>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
