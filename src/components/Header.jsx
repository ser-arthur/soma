import React, { useState } from 'react';
import { Bell, Search, ShieldCheck, Zap, Command, HelpCircle, ChevronDown } from 'lucide-react';
import SearchOverlay from './SearchOverlay.jsx';

/**
 * AXON - Institutional Header
 * High-performance navigation and global command center.
 */

const Header = ({ activeTab, viewMode }) => {
    // Identity logic
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const userName = viewMode === 'Admin' ? "Marcus Aurelius" : "Alex Johnson";
    const userRole = viewMode === 'Admin' ? "Authorising Officer" : "Personnel Asset";

    return (
        <header className="h-20 bg-white border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-40">
            {/* Left: Module Info & System Pulse */}
            <div className="flex items-center gap-10">
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">
                        {activeTab}
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Axon OS • {viewMode} Mode
                        </p>
                    </div>
                </div>

                <div className="h-8 w-px bg-slate-100 hidden lg:block"></div>

                {/* Global Gateway Status */}
                <div className="hidden xl:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        Statutory Sync: Active
                    </span>
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-8">
                <div
                    onClick={() => setIsSearchOpen(true)}
                    className="hidden lg:flex relative items-center group cursor-pointer"
                >
                    <Search className="absolute left-4 text-slate-400 group-hover:text-emerald-500 transition-colors" size={16} />
                    <div className="pl-12 pr-12 py-3 bg-slate-100/70 border-none rounded-2xl text-xs font-bold w-80 text-slate-400">
                        Search anything...
                    </div>
                    <div className="absolute right-4 flex items-center gap-1 px-1.5 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
                        <Command size={10} className="text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-400">K</span>
                    </div>
                </div>

                <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

                <div className="flex items-center gap-2">
                    {/* Support & Docs */}
                    <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
                        <HelpCircle size={20} />
                    </button>

                    {/* Notification Hub */}
                    <button className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-100"></div>

                {/* User Profile Dropdown */}
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{userName}</p>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                            {userRole}
                        </p>
                    </div>
                    <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xl shadow-slate-200 hover:scale-105 transition-transform">
                            {userName.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;