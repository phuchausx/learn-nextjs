import { useRouter } from 'next/router';
import * as React from 'react';

export interface IDetailPostProps {
}

export default function DetailPost (props: IDetailPostProps) {
    const router = useRouter();

  return (
    <div>
      <p>Detail Post</p>
      <p>{`Query: ${JSON.stringify(router.query)}`}</p>
    </div>
  );
}
