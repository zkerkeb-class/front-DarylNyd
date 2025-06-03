'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import AuthLayout from '@/components/layout/AuthLayout';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(formData.name, formData.email, formData.password);
        } catch (err) {
            setError(err.message || 'Failed to create account');
        }
    };

    return (
        <AuthLayout>
            <div className="flex-1 flex flex-col justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-secondary text-text">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-text/60 font-primary">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary-coral hover:text-primary-salmon transition-colors duration-200">
                            Sign in
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
                            <label htmlFor="name" className="sr-only">Full name</label>
                            <FaUser className="absolute top-3 left-3 text-text/40" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-primary-slate/20 placeholder-text/40 text-text focus:outline-none focus:ring-primary-coral focus:border-primary-coral focus:z-10 sm:text-sm font-primary bg-background"
                                placeholder="Full name"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <FaEnvelope className="absolute top-3 left-3 text-text/40" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-primary-slate/20 placeholder-text/40 text-text focus:outline-none focus:ring-primary-coral focus:border-primary-coral focus:z-10 sm:text-sm font-primary bg-background"
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
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-primary-slate/20 placeholder-text/40 text-text focus:outline-none focus:ring-primary-coral focus:border-primary-coral focus:z-10 sm:text-sm font-primary bg-background"
                                placeholder="Password"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
                            <FaLock className="absolute top-3 left-3 text-text/40" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-primary-slate/20 placeholder-text/40 text-text focus:outline-none focus:ring-primary-coral focus:border-primary-coral focus:z-10 sm:text-sm font-primary bg-background"
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-coral hover:bg-primary-salmon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-coral transition-colors duration-200 font-primary"
                        >
                            Create account
                        </button>
                    </div>

                    <p className="text-xs text-text/60 text-center font-primary">
                        By creating an account, you agree to our{' '}
                        <Link href="/terms" className="text-primary-coral hover:text-primary-salmon">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary-coral hover:text-primary-salmon">
                            Privacy Policy
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
} 