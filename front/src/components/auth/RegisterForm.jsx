'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ThemeButton from '@/components/ui/ThemeButton';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';

const RegisterForm = () => {
    const router = useRouter();
    const { register } = useAuth();
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            router.push('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        // Implement Google sign-in
    };

    return (
        <div className="w-full max-w-md min-h-[600px] flex flex-col">
            {/* Logo and Theme Toggle */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Image
                        src={isDarkMode ? '/Logo/Long_logo_dark.svg' : '/Logo/Long_logo_light.svg'}
                        alt="NYDART Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                    />
                </div>
                <ThemeButton />
            </div>

            <h1 className="text-3xl font-bold mb-2 text-text">Welcome NYDART</h1>
            <p className="text-text/60 mb-8">Welcome to NydArt dashboard Community</p>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Google Sign In Button */}
            <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-background border border-text/10 rounded-lg p-3 mb-6 hover:bg-text/5 transition-colors"
            >
                <FcGoogle className="text-2xl" />
                <span className="text-text">Continue With Google</span>
            </button>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-text/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-text/60">Or</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1">
                <Input
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Choose a username"
                />

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
                    placeholder="Create a password"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                />

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-text/10 bg-background text-primary-coral focus:ring-primary-coral"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-text/60">
                        Remember Me
                    </label>
                </div>

                <div className="mt-auto">
                    <Button
                        type="submit"
                        className="w-full bg-primary-coral hover:bg-primary-salmon text-white"
                        loading={loading}
                    >
                        Register
                    </Button>

                    <p className="text-center text-sm text-text/60 mt-6">
                        Already have an account?{' '}
                        <Link
                            href="/auth/login"
                            className="text-text hover:text-primary-coral transition-colors font-medium"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm; 