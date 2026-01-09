import React, { useState } from 'react';
import {
    User, Calendar, FileText, CreditCard, ShieldCheck, Home,
    MapPin, Send, Clock, Download, Plus, Briefcase,
    TrendingUp, ShieldAlert, FileUp, Eye
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/ui/Button';

const EmployeePortal = ({ employeeName = "James", role = "Senior Engineer", employeeType = 'Sponsored' }) => {
    const [presence, setPresence] = useState('Office');

    const portalActions = [
        { label: 'Edit Profile', icon: User, onClick: () => {} },
        { label: 'Book Time Off', icon: Plus, onClick: () => {} }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Direct, Professional Header */}
            <PageHeader
                title={`Welcome, ${employeeName}`}
                subtitle={role}
                description="Access your professional records, manage your attendance, and ensure your statutory documentation is up to date."
                icon={User}
                actions={portalActions}
                stats={[
                    { label: 'Annual Leave Left', value: '18 Days' },
                    { label: 'Total Compensation', value: '£42,500' },
                    { label: 'Next Pay Date', value: '28 Mar' }
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 1. PROFESSIONAL LEDGER */}
                <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Financial Ledger</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Current Salary & Benefits</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400"><TrendingUp size={20}/></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <div className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Annual Gross</p>
                                <p className="text-2xl font-black text-slate-900">£42,500</p>
                            </div>
                            <div className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pension Contributions</p>
                                <p className="text-2xl font-black text-[#064e3b]">£2,125</p>
                            </div>
                            <div className="p-6 bg-[#0f172a] rounded-[2rem] text-white">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Recent Net Pay</p>
                                <p className="text-2xl font-black tracking-tighter">£2,840</p>
                            </div>
                        </div>

                        <button className="flex items-center justify-between w-full p-6 bg-emerald-50 rounded-3xl border border-emerald-100 hover:bg-emerald-100 transition-colors">
                            <div className="flex items-center gap-4">
                                <FileText className="text-[#064e3b]" size={20} />
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Full Benefits Statement (2024/25)</span>
                            </div>
                            <Download size={18} className="text-[#064e3b]"/>
                        </button>
                    </div>
                </div>

                {/* 2. PRESENCE STATUS */}
                {/* 2. ATTENDANCE STATUS - REFINED COMMAND GRID */}
                <div className="lg:col-span-1 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Status</h4>
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Clock size={16}/></div>
                    </div>

                    <div className="space-y-4 flex-1">
                        {[
                            { id: 'Office', label: 'Working in Office', desc: 'On-site at HQ', icon: MapPin, color: 'emerald' },
                            { id: 'Remote', label: 'Working Remotely', desc: 'Secure Home Network', icon: Home, color: 'blue' },
                            { id: 'OOO', label: 'Out of Office', desc: 'Unavailable for tasks', icon: Clock, color: 'rose' }
                        ].map((opt) => {
                            const isActive = presence === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => setPresence(opt.id)}
                                    className={`w-full flex items-center gap-4 p-5 rounded-[2rem] border transition-all duration-300 group ${
                                        isActive
                                            ? `bg-slate-900 border-slate-900 shadow-xl shadow-slate-200 text-white translate-x-1`
                                            : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200 hover:bg-white'
                                    }`}
                                >
                                    <div className={`p-3 rounded-2xl transition-colors ${
                                        isActive ? 'bg-white/10 text-emerald-400' : 'bg-white text-slate-300 group-hover:text-slate-500 shadow-sm'
                                    }`}>
                                        <opt.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>

                                    <div className="text-left">
                                        <p className={`text-xs font-black uppercase tracking-tight ${isActive ? 'text-white' : 'text-slate-900'}`}>
                                            {opt.label}
                                        </p>
                                        <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                                            {opt.desc}
                                        </p>
                                    </div>

                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Institutional Confirmation */}
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-8 text-center pt-6 border-t border-slate-50">
                        Status synced to team pulse
                    </p>
                </div>
            </div>

            {/* 3. CONDITIONAL SPONSORSHIP STATUS */}
            {employeeType === 'Sponsored' && (
                <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6">
                                <ShieldAlert className="text-emerald-400" size={20} />
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300/80">Sponsorship Maintenance</p>
                            </div>
                            <h3 className="text-4xl font-black tracking-tighter mb-4">Visa Compliance</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                                Your current Right to Work is active. Please ensure any changes to your home address are updated here within 48 hours for UKVI reporting.
                            </p>
                        </div>
                        <div className="w-full lg:w-72">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Next RTW Check</p>
                                <p className="text-xl font-black text-white">July 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. STATUTORY FILING & DOCUMENTS */}
            <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-10 px-2">
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Statutory Filing</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Personal Records & Evidence</p>
                    </div>
                    <Button variant="primary" size="sm" icon={FileUp} className="bg-[#0f172a] rounded-2xl">Upload Document</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'Current Passport', status: 'Verified', date: 'Jan 2024' },
                        { title: 'Proof of Address', status: 'Pending Review', date: 'Mar 2024' },
                        { title: 'Employment Contract', status: 'Signed', date: 'Jan 2024' },
                        ...(employeeType === 'Sponsored' ? [{ title: 'BRP Scan', status: 'Verified', date: 'Jan 2024' }] : [])
                    ].map((doc, i) => (
                        <div key={i} className="group p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all relative">
                            <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400 mb-6 mx-auto w-fit group-hover:text-[#064e3b] transition-colors">
                                <FileText size={24} />
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-black text-slate-900 mb-1">{doc.title}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Last Updated: {doc.date}</p>

                                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-100">
                                    <button className="flex items-center gap-1.5 text-[9px] font-black uppercase text-[#064e3b] hover:underline">
                                        <Eye size={12}/> View
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-400 hover:text-slate-600">
                                        <Download size={12}/> Get
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeePortal;