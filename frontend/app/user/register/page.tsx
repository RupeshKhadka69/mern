import React from 'react'

const Register = () => {
    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <h2 className='text-xl'>Login Form </h2>
            <form action="" className='w-[400px]'>
                <div className='m-2 grid items-center content-center'>
                    <label className='text-sm'>Name</label>
                    <input className='px-4 py-1 border-black border-2' type="text" placeholder='Name..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>Email</label>
                    <input className='px-4 py-1 border-black border-2' type="email" placeholder='Name..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>Password</label>
                    <input className='px-4 py-1 border-black border-2' type="password" placeholder='Name..' />
                </div>
               <button className='btn border-2 border-black  py-0.5'>submit</button> 
            </form>
        </div>
    )
}

export default Register