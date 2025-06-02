'use client';

import React from 'react';
import clsx from 'clsx';

const Input = React.forwardRef(({
    className,
    type = 'text',
    error,
    label,
    required,
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                className={clsx(
                    "w-full px-4 py-2 rounded-lg border transition-colors duration-200",
                    "focus:outline-none focus:ring-2",
                    {
                        "border-gray-300 focus:border-blue-500 focus:ring-blue-200": !error,
                        "border-red-300 focus:border-red-500 focus:ring-red-200": error,
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input; 