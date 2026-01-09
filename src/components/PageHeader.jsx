import React from 'react';

const PageHeader = ({ title, subtitle, description, icon: Icon, stats = [], actions = [] }) => {
    return (
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* TOP ROW: Title & Floating Actions */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 px-2">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#064e3b] animate-pulse"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {subtitle}
                        </p>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mt-2">
                        {title}
                    </h1>
                </div>

                {/* THE "POWERHOUSE" ACTION PAIR */}
                <div className="flex items-center gap-3">
                    {actions.map((action, index) => {
                        const isFirst = index === 0;
                        return (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-xl active:scale-95 border ${
                                    isFirst
                                        ? 'bg-white text-[#064e3b] border-slate-100 hover:bg-slate-50'
                                        : 'bg-[#0f172a] text-emerald-400 border-[#0f172a] hover:bg-[#1e293b] shadow-emerald-900/10'
                                }`}
                            >
                                {action.icon && <action.icon size={14} strokeWidth={3} />}
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* THE CONTEXT CARD: Now with Institutional Gradient and Mesh effect */}
            <div className="relative rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-900/20 overflow-hidden
                bg-gradient-to-br from-[#064e3b] via-[#053d2f] to-[#042f24]">

                {/* Subtle Mesh Overlay for Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
                </div>

                <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                    {/* Description Section */}
                    <div className="max-w-3xl flex items-start gap-6">
                        {Icon && (
                            <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner flex-shrink-0 hidden md:block">
                                <Icon size={28} className="text-emerald-400" />
                            </div>
                        )}
                        <p className="text-emerald-50/90 text-sm leading-relaxed font-medium pt-1">
                            {description}
                        </p>
                    </div>

                    {/* Stats Integration */}
                    {stats.length > 0 && (
                        <div className="flex flex-wrap gap-8 lg:gap-12 xl:border-l xl:border-white/10 xl:pl-12">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <p className="text-2xl font-black data-mono tracking-tighter leading-none">
                                        {stat.value}
                                    </p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400/80">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Refined Background Ghost Icon */}
                {Icon && (
                    <Icon
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-white/5 pointer-events-none transform rotate-12"
                        size={200}
                    />
                )}
            </div>
        </div>
    );
};

export default PageHeader;