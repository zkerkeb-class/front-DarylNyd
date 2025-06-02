'use client';

import Image from 'next/image';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            <div className="w-full max-w-[1200px] min-h-[600px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
                {/* Left side - Form */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    {children}
                </div>

                {/* Right side - Art */}
                <div className="w-1/2 relative bg-gradient-to-br from-orange-400 to-black">
                    <div className="absolute inset-0">
                        <Image
                            src="/Auth/auth_bg.png"
                            alt="Abstract art"
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="rounded-r-3xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout; 