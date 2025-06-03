'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import AuthLayout from '@/components/layout/AuthLayout';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err) {
            setError(err.message || 'Failed to login');
        }
    };

    return (
        <AuthLayout>
            <div className="flex-1 flex flex-col justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-secondary text-text">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-text/60 font-primary">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-medium text-primary-coral hover:text-primary-salmon transition-colors duration-200">
                            Sign up
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <FaEnvelope className="absolute top-3 left-3 text-text/40" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-primary-slate/20 placeholder-text/40 text-text focus:outline-none focus:ring-primary-coral focus:border-primary-coral focus:z-10 sm:text-sm font-primary bg-background"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <FaLock className="absolute top-3 left-3 text-text/40" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-primary-slate/20 placeholder-text/40 text-text focus:outline-none focus:ring-primary-coral focus:border-primary-coral focus:z-10 sm:text-sm font-primary bg-background"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary-coral focus:ring-primary-coral border-primary-slate/20 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-text/60 font-primary">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-primary-coral hover:text-primary-salmon transition-colors duration-200 font-primary">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-coral hover:bg-primary-salmon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-coral transition-colors duration-200 font-primary"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
} 