import React from 'react';

/**
 * SOMA Dynamic StatCard
 * Props:
 * - variant: 'light' (default) or 'deep' (midnight shine)
 * - status: 'neutral', 'warning', 'danger'
 */
const StatCard = ({ title, value, icon: Icon, trend, status = 'neutral', variant = 'light' }) => {

    const statusStyles = {
        neutral: { text: "text-emerald-500", bg: "bg-emerald-500/10", glow: "bg-emerald-500/5" },
        warning: { text: "text-amber-500", bg: "bg-amber-500/10", glow: "bg-amber-500/5" },
        danger: { text: "text-rose-500", bg: "bg-rose-500/10", glow: "bg-rose-500/5" },
    };

    const s = statusStyles[status] || statusStyles.neutral;

    // Deep Variant (The Midnight Shine)
    if (variant === 'deep') {
        return (
            <div className="relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#0f172a] border border-white/10 border-t-white/30 transition-all hover:scale-[1.02] duration-300">
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${s.glow} blur-[50px]`}></div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${s.text}`}>
                            <Icon size={20} strokeWidth={2.5} />
                        </div>
                        {trend && <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">{trend}</span>}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
                        <h3 className="text-3xl font-black tracking-tighter italic">{value}</h3>
                    </div>
                </div>
            </div>
        );
    }

    // Light Variant (Standard Professional)
    return (
        <div className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-4 bg-[#0f172a] rounded-2xl shadow-lg border border-white/10 border-t-white/20 relative overflow-hidden group-hover:scale-110 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
                    <Icon size={22} className={s.text} strokeWidth={2.5} />
                </div>
                {trend && (
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-full border ${s.bg} ${s.text} border-current uppercase tracking-tighter`}>
                        {trend}
                    </span>
                )}
            </div>

            <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
            </div>

            <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${s.glow} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
        </div>
    );
};

export default StatCard;