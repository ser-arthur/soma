import React, { useState, useMemo } from 'react';
import { Search, UserPlus, Eye, Filter, Users, Download, Clock, ShieldCheck } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { EMPLOYEES } from '../../data/mockData.js';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';

const EmployeeDirectory = ({ onSelectEmployee }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    const filteredList = useMemo(() => {
        return EMPLOYEES.filter(emp => {
            const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.soc.includes(searchTerm);
            const matchesFilter = filterType === 'All' || emp.type === filterType;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filterType]);

    // Institutional Header Configuration
    const directoryActions = [
        { label: 'Export Registry', icon: Download, onClick: () => handleExport() }, // White/Green
        { label: 'Add Employee', icon: UserPlus, onClick: () => setShowModal(true) }  // Midnight/Emerald
    ];

    const headerStats = [
        { label: 'Total Workforce', value: EMPLOYEES.length.toString() },
        { label: 'Sponsored Assets', value: EMPLOYEES.filter(e => e.type === 'Sponsored').length.toString() },
        { label: 'Compliance Pass', value: '100%' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Standardized Institutional Header */}
            <PageHeader
                title="Workforce Registry"
                subtitle="Global Talent Management"
                description="Centralized command for global mobility and settled workforce. Integrated verification of SOC alignment and Right to Work (RTW) status for all active personnel."
                icon={Users}
                actions={directoryActions}
                stats={headerStats}
            />

            {/* High-Tech Search & Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {['All', 'Sponsored', 'Settled'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                filterType === type
                                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-lg shadow-slate-200'
                                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'
                            }`}
                        >
                            {type} Personnel
                        </button>
                    ))}
                </div>

                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#064e3b] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search Identity, SOC, or Role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#064e3b]/20 focus:bg-white transition-all w-full lg:w-80 outline-none"
                    />
                </div>
            </div>

            {/* Institutional Directory Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                        <tr>
                            <th className="px-10 py-6">Personnel Identity</th>
                            <th className="px-6 py-6">Institutional Role</th>
                            <th className="px-6 py-6">Immigration Track</th>
                            <th className="px-6 py-6">Regulatory Health</th>
                            <th className="px-10 py-6 text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {filteredList.map(emp => (
                            <tr key={emp.id} className="hover:bg-slate-50/80 transition-all group">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#0f172a] rounded-2xl flex items-center justify-center text-sm font-black text-emerald-400 shadow-lg group-hover:scale-110 transition-transform">
                                            {emp.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 leading-none mb-1.5">{emp.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold tracking-tight data-mono">{emp.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <p className="text-xs font-bold text-slate-700">{emp.role}</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">SOC {emp.soc}</p>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex flex-col gap-1.5">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg w-fit ${
                                                emp.type === 'Sponsored' ? 'bg-[#064e3b]/10 text-[#064e3b]' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {emp.visaRoute || 'Settled'}
                                            </span>
                                        {emp.visaExpiry !== 'N/A' && (
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold data-mono uppercase">
                                                <Clock size={12} /> {emp.visaExpiry}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                            emp.status === 'Active' ? 'bg-emerald-500' : emp.status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'
                                        } animate-pulse`}></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{emp.status}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <button
                                        onClick={() => onSelectEmployee(emp)}
                                        className="p-3 bg-slate-50 text-slate-400 hover:text-[#064e3b] hover:bg-[#064e3b]/10 rounded-xl transition-all shadow-none hover:shadow-sm"
                                    >
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

export default EmployeeDirectory;