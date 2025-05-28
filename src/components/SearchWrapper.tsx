'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchWrapper() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <p>Search Query: {query}</p>
    </div>
  );
}