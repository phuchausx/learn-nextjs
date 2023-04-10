import React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
    idStudent: string;
}

export default function StudentDetail ({ idStudent }: StudentDetailProps) {
    const { data, error, mutate, isValidating } = useSWR(`/students/${idStudent}`, { revalidateOnFocus: false });
    console.log('data student detail', data);
    
  return (
    <div>
      <p>{`Name of student: ${data?.name || '--'}`}</p>
    </div>
  );
}
