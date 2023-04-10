// tsrpfc
import { LayoutProps } from '@/models';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks';

export function MainLayout ({children}: LayoutProps) {
  const { firstLoading, profile, logout } = useAuth();
  const router = useRouter();

  const handleLogoutClick = async () => {
    try {
        await logout();
        router.push("/login");
    } catch (error) {
        console.log('failed to logout', error);
    }
}

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push("/login");
  }, [firstLoading, profile, router]);

  if (firstLoading && !profile?.username) {
    return <p>Loading...</p>
  }

  return (
    <div>
        <h1>Main Layout</h1>
        <button onClick={() => handleLogoutClick()}>Logout</button>

        <Link href="/">
            <p>Home</p>
        </Link>
        <Link href="/about">
            <p>About</p>
        </Link>

        <p>This is Content:</p>
        <div>{children}</div>
    </div>
  );
}
