
// ProfilePage.tsx
"use client"
// ProfilePage.tsx

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '@/app/utils/authProvider';

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/user/register');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>{user.name}</div>
    </div>
  );
};

export default ProfilePage;
