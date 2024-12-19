'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/auth';
import { useAuth } from '../../contexts/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const [registerMutation] = useMutation(REGISTER, {
    onCompleted: (data) => {
      console.log('Registration completed:', data);
      login(data.register.token, data.register.user);
      router.push('/verify');
    },
    onError: (error) => {
      console.error('Registration mutation error:', error);
      console.error('GraphQL error details:', error.graphQLErrors);
      console.error('Network error details:', error.networkError);
      if (error.message.includes('535 Authentication failed')) {
        setError('Account created but verification email could not be sent. Please contact support.');
      } else {
        setError(error.message);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Form submitted with:', { email, password });

    try {
      console.log('Attempting registration mutation...');
      const { data, errors } = await registerMutation({
        variables: { email, password },
      });

      console.log('Registration response:', { data, errors });

      if (errors) {
        console.error('GraphQL errors:', errors);
        setError(errors[0]?.message || 'Registration failed');
        return;
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message);
        console.error('Error details:', err.message, err.stack);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
