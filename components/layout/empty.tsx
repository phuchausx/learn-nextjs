// tsrpfc
import { LayoutProps } from '@/models';
import Link from 'next/link';
import * as React from 'react';

export function EmptyLayout ({children}: LayoutProps) {
  return (
    <div>{children}</div>
  );
}
