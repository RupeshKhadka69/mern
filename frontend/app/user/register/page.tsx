"use client"
import React, { useState } from 'react';
import { useMutation } from 'react-query';
// import client from '@/app/lib/queryClient'; // Assuming this file exports the QueryClient instance
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    // const client = new QueryClient();

    type RegisterForm = {
        name: string;
        email: string;
        password: string;
    };

    const { mutate, isLoading } = useMutation((formData: RegisterForm) => axios.post('http://localhost:8000/api/user', formData),
        {
            onSuccess: () => {
                toast.success('Registration successful');
                // Optionally, you can reset form fields here
                setName('');
                setEmail('');
                setPassword('');
            },
            onError: () => {
                toast.error('Registration failed');
            }
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await mutate({ name, email, password });
    };

    return (
        // <QueryClientProvider client={client} contextSharing={true}>
            <div className='flex h-screen flex-col items-center justify-center'>
                <h2 className='text-xl'>Login Form</h2>
                <form onSubmit={handleSubmit} className='w-[400px]'>
                    <div className='m-2 grid items-center content-center'>
                        <label className='text-sm'>Name</label>
                        <input className='px-4 py-1 border-black border-2' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name..' />
                    </div>
                    <div className='m-2 grid'>
                        <label className='text-sm'>Email</label>
                        <input className='px-4 py-1 border-black border-2' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email..' />
                    </div>
                    <div className='m-2 grid'>
                        <label className='text-sm'>Password</label>
                        <input className='px-4 py-1 border-black border-2' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password..' />
                    </div>
                    <button type='submit' className='btn border-2 border-black py-0.5'>{isLoading ? 'Loading...' : 'Submit'}</button>
                </form>
                <ToastContainer />
            </div>
        // </QueryClientProvider>
    );
};

export default Register;
