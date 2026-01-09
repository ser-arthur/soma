import React, { useState } from 'react';
import { Search, User, FileText, Zap, ArrowRight, Command, X } from 'lucide-react';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');

    if (!isOpen) return null;

    // Mock Results - In a real app, this filters through your data
    const results = [
        { id: 1, type: 'Personnel', title: 'Sarah Chen', detail: 'Engineering • Sponsored', icon: User },
        { id: 2, type: 'Module', title: 'Compensation Ledger', detail: 'Financial Governance', icon: Zap },
        { id: 3, type: 'Action', title: 'Export Statutory Record', detail: 'Generate Audit ZIP', icon: FileText },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            {/* Search Box */}
            <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                    <Search className="text-emerald-500" size={24} />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search personnel, modules, or actions..."
                        className="flex-1 bg-transparent border-none outline-none text-lg font-bold text-slate-900 placeholder:text-slate-300"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ESC to close</span>
                    </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
                    {results.map((res) => (
                        <button
                            key={res.id}
                            className="w-full p-4 hover:bg-slate-50 rounded-2xl flex items-center justify-between group transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-xl text-slate-400 group-hover:bg-[#0f172a] group-hover:text-white transition-all">
                                    <res.icon size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black text-slate-900 leading-none mb-1">{res.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{res.type} • {res.detail}</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-slate-200 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1" />
                        </button>
                    ))}
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-black">↑↓</div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Navigate</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-black">ENTER</div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Select</span>
                        </div>
                    </div>
                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest italic">Powered by SOMA Intelligence</p>
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;