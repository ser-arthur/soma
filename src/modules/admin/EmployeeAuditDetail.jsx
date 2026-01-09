import React from 'react';
import {
    User, ShieldCheck, MapPin, Mail, Phone,
    Calendar, FileText, Download, ArrowLeft,
    Activity, Clock, CreditCard
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge'; // Ensure this is imported
import { AUDIT_VAULT } from "../../data/mockData.js";

const TimelineOfStay = ({ employee }) => {
    const milestones = [
        { date: employee.joinedDate, label: 'Initial Sponsorship Commenced', detail: `CoS Assigned for ${employee.role}`, icon: ShieldCheck, status: 'completed' },
        { date: '2023-01-05', label: 'Annual Address Verification', detail: 'Residential record synchronized', icon: MapPin, status: 'completed' },
        { date: '2024-03-12', label: 'Regulatory Status Check', detail: 'Right to Work verified via HO Gateway', icon: Activity, status: 'active' },
        { date: employee.visaExpiry, label: 'Visa Asset Expiry', detail: 'Critical extension window', icon: Clock, status: 'future' },
    ];

    return (
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            {/* Improved Contrast Heading */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-50">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-4 bg-[#064e3b] rounded-full"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#064e3b]">Audit Trail</p>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter">Institutional Timeline of Stay</h3>
                </div>
                <Badge variant="outline" className="rounded-xl px-4 py-1 text-[9px] border-slate-200">Historical Archive</Badge>
            </div>

            <div className="relative border-l-2 border-slate-100 ml-4 space-y-12">
                {milestones.map((item, i) => (
                    <div key={i} className="relative pl-12 group">
                        {/* The Node */}
                        <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-md transition-all group-hover:scale-125 ${
                            item.status === 'active' ? 'bg-[#064e3b] animate-pulse' :
                                item.status === 'completed' ? 'bg-emerald-400' : 'bg-slate-200'
                        }`}></div>

                        <div className="transition-all group-hover:translate-x-1">
                            <p className="text-[10px] font-black text-slate-400 data-mono uppercase mb-1">{item.date}</p>
                            <h4 className="text-sm font-black text-slate-900 group-hover:text-[#064e3b]">{item.label}</h4>
                            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">{item.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EmployeeProfile = ({ employee, onBack }) => {
    if (!employee) return null;
    const personalDocuments = AUDIT_VAULT.filter(doc => doc.empId === employee.id);

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-400 hover:text-[#064e3b] font-black text-[10px] uppercase tracking-widest transition-all"
                >
                    <ArrowLeft size={16} /> Back to Directory
                </button>
                <div className="flex gap-3">
                    <Button variant="secondary" className="rounded-2xl" icon={Download}>Export Dossier</Button>
                    <Button variant="primary" className="bg-[#0f172a] rounded-2xl" icon={ShieldCheck}>RTW Re-Verify</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm text-center relative overflow-hidden">
                        <div className="w-24 h-24 bg-[#0f172a] rounded-[2rem] flex items-center justify-center text-3xl font-black text-emerald-400 mx-auto mb-6 shadow-2xl">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{employee.name}</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {employee.id}</p>
                        <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                            <div className="flex items-center gap-3 text-slate-500 text-xs font-bold">
                                <Mail size={14} className="text-[#064e3b]" /> {employee.email}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-xs font-bold">
                                <MapPin size={14} className="text-[#064e3b]" /> London, UK
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white shadow-2xl">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-6">Immigration Track</p>
                        <div className="space-y-6">
                            <div>
                                <p className="text-3xl font-black tracking-tighter">{employee.visaRoute}</p>
                                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Route Classification</p>
                            </div>
                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <p className="text-xl font-black data-mono">{employee.visaExpiry}</p>
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Expiry Date</p>
                                </div>
                                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                    <Clock className="text-emerald-400" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm grid grid-cols-2 gap-10">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Current Role</p>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">{employee.role}</h3>
                            <p className="text-xs font-bold text-[#064e3b] mt-1">SOC: {employee.soc}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Salary Alignment</p>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">£{employee.salary.toLocaleString()}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Above Threshold</p>
                            </div>
                        </div>
                    </div>

                    {/* Integrated Personal Evidence Vault */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-10 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Personnel Evidence Archive</h4>
                            <span className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest">
                                {personalDocuments.length} Institutional Records Found
                            </span>
                        </div>
                        <div className="p-6">
                            {personalDocuments.length > 0 ? (
                                personalDocuments.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-100 rounded-xl text-slate-400 group-hover:bg-[#064e3b] group-hover:text-white transition-all shadow-inner">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{doc.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Category: {doc.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <span className="text-[9px] font-black text-[#064e3b] uppercase tracking-tighter">Verified {doc.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${doc.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {doc.status}
                                            </div>
                                            <button className="p-2 text-slate-300 hover:text-[#064e3b] transition-colors"><Download size={18} /></button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase">No regulatory evidence found for this identity.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MOVED TIMELINE HERE: Now correctly placed outside the Vault div */}
                    <TimelineOfStay employee={employee} />
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;