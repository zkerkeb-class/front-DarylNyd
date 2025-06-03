'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';
import ThemeButton from '@/components/ui/ThemeButton';

const Header = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const { isDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/auth/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navigationItems = [
        { label: 'Home', href: '/' },
        { label: 'Artworks', href: '/artworks' },
        { label: 'Artists', href: '/artists' },
        { label: 'Advisor', href: '/analyze' },
        { label: 'About', href: '/about' },
    ];

    return (
        <header className="bg-background shadow-md transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src={isDarkMode ? '/Logo/Long_logo_dark.svg' : '/Logo/Long_logo_light.svg'}
                            alt="NYDART Logo"
                            width={120}
                            height={50}
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-text hover:text-primary-coral px-3 py-2 text-sm font-medium font-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User Menu & Theme Toggle - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeButton />

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 text-text hover:text-primary-coral"
                                >
                                    <FaUserCircle className="h-6 w-6" />
                                    <span className="font-primary">{user.username}</span>
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg py-1">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-text hover:bg-primary-coral hover:text-white font-primary"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="block px-4 py-2 text-sm text-text hover:bg-primary-coral hover:text-white font-primary"
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary-coral hover:text-white font-primary"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="text-text hover:text-primary-coral px-3 py-2 text-sm font-medium font-primary"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeButton />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-text hover:text-primary-coral"
                        >
                            {isMenuOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-text hover:text-primary-coral hover:bg-background-alt font-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="block px-3 py-2 text-base font-medium text-text hover:text-primary-coral hover:bg-background-alt font-primary"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-3 py-2 text-base font-medium text-text hover:text-primary-coral hover:bg-background-alt font-primary"
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 text-base font-medium text-text hover:text-primary-coral hover:bg-background-alt font-primary"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="block px-3 py-2 text-base font-medium text-text hover:text-primary-coral hover:bg-background-alt font-primary"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 