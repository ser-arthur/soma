import React from 'react';
import {
    LayoutDashboard, Users, CalendarClock, ShieldAlert,
    Banknote, Settings, UserCircle, Component,
    ChevronRight, BookOpen, Fingerprint, Repeat, ShieldCheck, Activity
} from 'lucide-react';

/**
 * SOMA OS - INSTITUTIONAL SIDEBAR
 * Centralized control for the organizational nervous system.
 */
const Sidebar = ({ viewMode, activeTab, setActiveTab, onRoleSwitch }) => {

    // Grouped Navigation - Admin (The Control Center)
    const adminMenu = [
        {
            group: "Intelligence",
            items: [
                { id: 'Dashboard', icon: LayoutDashboard },
                { id: 'Employees', icon: Users },
            ]
        },
        {
            group: "Regulatory Body",
            items: [
                { id: 'Absence Tracker', icon: CalendarClock },
                { id: 'Audit Records', icon: ShieldAlert },
                { id: 'Compensation & Compliance', icon: Banknote },
            ]
        },
        {
            group: "System Core",
            items: [
                { id: 'System Settings', icon: Settings },
            ]
        }
    ];

    // Grouped Navigation - Employee (The Personnel Node)
    const employeeMenu = [
        {
            group: "Personal Node",
            items: [
                { id: 'My Dashboard', icon: LayoutDashboard },
                { id: 'My Profile', icon: UserCircle },
            ]
        },
        {
            group: "Statutory Ledger",
            items: [
                { id: 'Time Off', icon: CalendarClock },
                { id: 'Payroll Archive', icon: Banknote },
                { id: 'Statutory Folder', icon: Fingerprint },
            ]
        },
        {
            group: "Institutional Knowledge",
            items: [
                { id: 'Company Handbook', icon: BookOpen },
            ]
        }
    ];

    const menu = viewMode === 'Admin' ? adminMenu : employeeMenu;

    return (
        <aside className="w-72 h-screen bg-[#0f172a] text-slate-400 flex flex-col fixed left-0 top-0 z-50 border-r border-white/5">

            {/* SOMA LOGO SECTION */}
            <div className="p-8 px-4 pb-10">
                <div className="flex items-center gap-4">
                    {/* Component Icon: Represents a central module/hub in a system */}
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-[0_8px_20px_rgba(16,185,129,0.2)]">
                        <Fingerprint size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tighter leading-none uppercase">SOMA</h1>
                        {/* Workforce Architecture: Implies building and managing the company structure */}
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.22em] mt-2 whitespace-nowrap">
                            Workforce Architecture
                        </p>
                    </div>
                </div>
            </div>

            {/* WORKSPACE SWITCHER */}
            <div className="px-6 mb-8">
                <button
                    onClick={onRoleSwitch}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group relative overflow-hidden text-left"
                >
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Workspace</p>
                            <p className="text-xs font-black text-white">{viewMode} Console</p>
                        </div>
                        <Repeat size={16} className="text-emerald-500 group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                </button>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-4 overflow-y-auto space-y-8 pb-10 scrollbar-hide">
                {menu.map((group, idx) => (
                    <div key={idx} className="space-y-1.5">
                        <h3 className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3">
                            {group.group}
                        </h3>
                        {group.items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                                    activeTab === item.id
                                        ? 'bg-emerald-500/10 text-white border border-emerald-500/20'
                                        : 'hover:bg-white/5 hover:text-slate-200 border border-transparent'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} className={activeTab === item.id ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'} />
                                    <span className="text-xs font-bold tracking-tight">{item.id}</span>
                                </div>
                                {activeTab === item.id && <ChevronRight size={14} className="text-emerald-400 animate-in slide-in-from-left-2" />}
                            </button>
                        ))}
                    </div>
                ))}
            </nav>

            {/* SYSTEM INTEGRITY FOOTER */}
            <div className="p-6 mt-auto border-t border-white/5 bg-slate-900/50">
                <div className="flex items-center gap-4 px-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-tight">System Pulse</p>
                        <p className="text-[9px] font-bold text-emerald-500/60 uppercase">UKVI Sync Active</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;