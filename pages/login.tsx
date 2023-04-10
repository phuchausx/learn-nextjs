import { useAuth } from '@/hooks';
import Link from 'next/link';
import * as React from 'react';

export interface LoginPageProps {
}

export default function LoginPage (props: LoginPageProps) {
    const { profile, login, logout } = useAuth({ revalidateOnMount: false });

    const handleLoginClick = async () => {
        try {
            await login();

        } catch (error) {
            console.log('failed to login', error);        
        }
    }
    const handleLogoutClick = async () => {
        try {
            await logout();
        } catch (error) {
            console.log('failed to logout', error);
        }
    }

    console.log('profile', profile);
    

  return (
    <div>
      <h1>Login Page</h1>
      <br />
      <ul>
        <li>{`Username: ${profile?.username || '--'}`}</li>
        <li>{`City: ${profile?.city || '--'}`}</li>
        <li>{`Email: ${profile?.email || '--'}`}</li>
      </ul>
      <br />
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleLogoutClick}>Logout</button>

      <Link href="/about" style={ profile ? { pointerEvents: 'auto' } : { pointerEvents: 'none', opacity: 0.7 }}>
        <button>Redirect to About Page</button>
      </Link>
    </div>
  );
}
