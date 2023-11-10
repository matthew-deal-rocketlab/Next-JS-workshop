'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SignOut() {
  const router = useRouter();

  // TODO: Implement sign out

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className="mt-auto w-full">
      <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium text-black hover:bg-gray-300 hover:text-gray-600">
        Sign Out
      </button>
    </form>
  );
}
