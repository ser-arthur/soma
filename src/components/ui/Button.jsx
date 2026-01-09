import React from 'react';

/**
 * Primary Button Component
 * Supports multiple variants and standardized sizing.
 */
const Button = ({
                    children,
                    onClick,
                    variant = "primary",
                    size = "md",
                    icon: Icon,
                    className = "",
                    disabled = false
                }) => {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100",
        secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
        danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-100",
        ghost: "text-slate-500 hover:bg-slate-50 hover:text-indigo-600",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {Icon && <Icon size={size === 'sm' ? 14 : 18} />}
            {children}
        </button>
    );
};

export default Button;