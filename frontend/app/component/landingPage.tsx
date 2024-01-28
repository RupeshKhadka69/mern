import React from 'react'
import Link from 'next/link'
const LandingPage = () => {
  return (
    <div className='text-center'>
        <h3 className='text-xl '> This is the Home Page</h3>
        <Link href="/user/register">sign up</Link>
    </div>
  )
}

export default LandingPage