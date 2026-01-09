import React from 'react';

/**
 * Badge Component
 * Used for status indicators, visa types, and categorical labels.
 */
const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
        default: "bg-slate-100 text-slate-600 border-slate-200",
        success: "bg-emerald-50 text-emerald-700 border-emerald-100",
        warning: "bg-amber-50 text-amber-700 border-amber-100",
        danger: "bg-rose-50 text-rose-700 border-rose-100",
        info: "bg-indigo-50 text-indigo-700 border-indigo-100",
    };

    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider transition-colors ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
    );
};

export default Badge;