'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaPalette } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
        setLoading(true);

        try {
            await login(formData);
            router.push('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        // Implement Google sign-in
    };

    return (
        <div className="w-full max-w-md min-h-[600px] flex flex-col">
            {/* Logo */}
            <div className="flex items-center mb-8">
                <FaPalette className="text-4xl text-black" />
                <span className="ml-2 text-2xl font-bold">NYDART</span>
            </div>

            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-8">Welcome to NydArt dashboard Community</p>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Google Sign In Button */}
            <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg p-3 mb-6 hover:bg-gray-50 transition-colors"
            >
                <FcGoogle className="text-2xl" />
                Continue With Google
            </button>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                />

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                            Remember Me
                        </label>
                    </div>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-black hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="mt-auto">
                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-900"
                        loading={loading}
                    >
                        Log in
                    </Button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <Link
                            href="/auth/register"
                            className="text-black hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm; 