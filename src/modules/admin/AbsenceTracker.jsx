import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    AlertCircle,
    UserCheck,
    Download,
    Filter,
    Plus,
    Eye,
    Home,
    MapPin,
    Users,
    Briefcase
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { EMPLOYEES } from '../../data/mockData';
import Button from '../../components/ui/Button';

/**
 * Absence & Presence Intelligence Module
 * Core HR utility for workforce availability and statutory reporting.
 */
const AbsenceTracker = () => {
    const [filterDept, setFilterDept] = useState('All');

    // Core HR Data Simulation
    const presenceStats = { inOffice: 84, remote: 12, absent: 4 };

    const leaveRegistry = [
        { id: 1, name: 'Alex Johnson', dept: 'Engineering', type: 'Annual Leave', range: 'Mar 12 - Mar 18', status: 'Approved', coverage: 'High', isSponsored: true },
        { id: 2, name: 'Sarah Chen', dept: 'Product', type: 'Remote (Global)', range: 'Mar 01 - Mar 30', status: 'Working', coverage: 'Full', isSponsored: true },
        { id: 3, name: 'Liam Wilson', dept: 'Legal', type: 'Sick Leave', range: 'Mar 14 - Present', status: 'Critical', coverage: 'At Risk', isSponsored: false },
        { id: 4, name: 'Elena Rodriguez', dept: 'Operations', type: 'Unpaid Leave', range: 'Mar 15 - Mar 16', status: 'Approved', coverage: 'High', isSponsored: true }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20">
            {/* Page Header with Core HR Focus */}
            <PageHeader
                title="Workforce Availability"
                subtitle="Attendance & Presence Command"
                description="Institutional oversight of daily presence distribution and leave management. Integrated with statutory 10-day reporting triggers for the sponsored workforce."
                icon={CalendarIcon}
                stats={[
                    { label: 'On-Site Today', value: '84%' },
                    { label: 'Remote Access', value: '12%' },
                    { label: 'Regulatory Risk', value: '0.0%' }
                ]}
                actions={[
                    { label: 'Export P11 Absences', icon: Download, variant: 'secondary' },
                    { label: 'Record Attendance', icon: Plus, variant: 'primary' }
                ]}
            />

            {/* TOP ROW: Operational vs Regulatory Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 1. Presence Distribution (Core HR) */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Presence Matrix</h4>
                    <div className="space-y-6">
                        {[
                            { label: 'In-Office / On-Site', value: presenceStats.inOffice, color: 'bg-emerald-500', icon: MapPin },
                            { label: 'Remote / Field', value: presenceStats.remote, color: 'bg-blue-500', icon: Home },
                            { label: 'Absent / Leave', value: presenceStats.absent, color: 'bg-slate-200', icon: Clock }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${item.color.replace('bg-', 'bg-')}/10 text-${item.color.replace('bg-', '')}`}>
                                        <item.icon size={14} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Statutory 10-Day Watchdog (Compliance Add-on) */}
                <div className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#0f172a] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/10 border-t-white/30 border-l-white/20">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                            <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">Sponsorship Guardian</h4>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter mb-4">Breach Protection</h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-8">
                            NexusHR is actively monitoring consecutive leave patterns to prevent <span className="text-white font-bold">10-day reporting breaches</span>.
                        </p>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Active Risks</span>
                            <span className="text-sm font-black text-emerald-400">Zero Detected</span>
                        </div>
                    </div>
                </div>

                {/* 3. Leave Entitlement Pulse (Core HR) */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Entitlement Pipeline</h4>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">1,240</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">Days Left</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-6">
                        Aggregate workforce holiday balance remaining for the current fiscal period.
                    </p>
                    <div className="h-2 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
                        <div className="h-full bg-[#064e3b] w-[62%] rounded-full shadow-lg"></div>
                    </div>
                </div>
            </div>

            {/* MAIN REGISTRY: Integrated Operational View */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Attendance Registry</h3>
                        <div className="h-4 w-px bg-slate-200"></div>
                        <div className="flex gap-4">
                            {['All', 'Engineering', 'Operations', 'Sales'].map(dept => (
                                <button key={dept} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" icon={Filter} className="rounded-xl">Advanced Matrix</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                        <tr>
                            <th className="px-10 py-6">Personnel Asset</th>
                            <th className="px-6 py-6">Department</th>
                            <th className="px-6 py-6">Leave Category</th>
                            <th className="px-6 py-6">Reporting Risk</th>
                            <th className="px-6 py-6">Coverage Status</th>
                            <th className="px-10 py-6 text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {leaveRegistry.map((item) => (
                            <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-[10px] font-black text-emerald-400 shadow-lg group-hover:scale-110 transition-transform">
                                            {item.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 leading-none mb-1.5">{item.name}</p>
                                            {item.isSponsored && (
                                                <span className="text-[9px] font-black text-[#064e3b] uppercase bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Sponsored</span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-xs font-bold text-slate-600 uppercase tracking-tighter">{item.dept}</td>
                                <td className="px-6 py-6">
                                    <div className="flex flex-col">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.type === 'Unpaid Leave' ? 'text-amber-600' : 'text-slate-900'}`}>{item.type}</span>
                                        <span className="text-[10px] font-bold text-slate-400 data-mono mt-1">{item.range}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Critical' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{item.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center w-24">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">Coverage</span>
                                            <span className="text-[9px] font-black text-slate-700">{item.coverage === 'At Risk' ? '20%' : '100%'}</span>
                                        </div>
                                        <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${item.coverage === 'At Risk' ? 'bg-rose-500' : 'bg-[#064e3b]'} w-[${item.coverage === 'At Risk' ? '20%' : '100%'}]`}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <button className="p-3 bg-slate-50 text-slate-300 hover:text-[#064e3b] hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                                        <Eye size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AbsenceTracker;