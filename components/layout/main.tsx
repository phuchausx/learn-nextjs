// tsrpfc
import { LayoutProps } from '@/models';
import Link from 'next/link';
import * as React from 'react';

export function MainLayout ({children}: LayoutProps) {
  return (
    <div>
        <h1>Main Layout</h1>

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
