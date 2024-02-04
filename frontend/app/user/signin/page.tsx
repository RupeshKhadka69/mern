"use client"
// Login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '@/app/utils/authProvider';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: async () => {
      toast.success('Login successful');
      
      router.push('/user/profile');
    },
    onError: (error) => {
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       mutate({ email, password }); // Await the result of mutate
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
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
        <button type='submit' disabled={isLoading} className='btn border-2 border-black py-0.5'>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
