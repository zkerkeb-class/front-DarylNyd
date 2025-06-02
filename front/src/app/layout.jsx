import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'NydArt Advisor',
    description: 'Your personal art advisor powered by AI',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
} 