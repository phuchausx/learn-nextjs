import StudentDetail from '@/components/swr/StudentDetail';
import * as React from 'react';

export interface SWRPageProps {
}

export default function SWRPage (props: SWRPageProps) {
  return (
    <div>
      <h1>SWR Playground</h1>
      <StudentDetail idStudent="lea11ziflg8xoiza" />
      <StudentDetail idStudent="lea11ziflg8xoiza" />
      <StudentDetail idStudent="lea11ziflg8xoiza" />
    </div>
  );
}
