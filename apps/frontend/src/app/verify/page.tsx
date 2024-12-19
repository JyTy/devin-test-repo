'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from '../../graphql/auth';

export default function VerifyPage() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    if (token) {
      verifyEmail({ variables: { token } })
        .then((response) => {
          if (response.data.verifyEmail.success) {
            setVerified(true);
            setTimeout(() => router.push('/'), 3000);
          } else {
            setError(response.data.verifyEmail.message || 'Verification failed');
          }
        })
        .catch(err => setError(err.message));
    }
  }, [token, verifyEmail, router]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {verified ? (
        <div className="text-green-600">Email verified! Redirecting...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div>Verifying your email...</div>
      )}
    </div>
  );
}
