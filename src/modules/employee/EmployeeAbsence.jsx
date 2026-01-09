import React, { useState } from 'react';
import {
    Calendar as CalendarIcon, Clock, AlertCircle,
    Plus, ChevronLeft, ChevronRight, CheckCircle, Info
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';

const EmployeeAbsence = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Header Actions
    const absenceActions = [
        { label: 'Request Leave', icon: Plus, onClick: () => setIsModalOpen(true), primary: true }
    ];

    // Mock Leave Data
    const absences = [
        { id: 1, type: 'Annual Leave', status: 'Approved', start: '2024-03-10', end: '2024-03-15', days: 5 },
        { id: 2, type: 'Sponsorship Reporting', status: 'System Note', start: '2024-03-20', end: '2024-03-20', days: 0 },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <PageHeader
                title="Time Off & Absence"
                subtitle="Attendance Compliance"
                description="Manage your leave requests and track your statutory attendance records. Note: All absences are cross-referenced with sponsorship reporting requirements."
                icon={CalendarIcon}
                actions={absenceActions}
                stats={[
                    { label: 'Annual Allowance', value: '28 Days' },
                    { label: 'Used to Date', value: '12 Days' },
                    { label: 'Remaining', value: '16 Days' }
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CALENDAR VIEW (LHS - 2 Columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Attendance Calendar</h3>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-50 rounded-lg"><ChevronLeft size={20}/></button>
                                <span className="px-4 py-2 font-bold text-sm">March 2024</span>
                                <button className="p-2 hover:bg-slate-50 rounded-lg"><ChevronRight size={20}/></button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="text-[10px] font-black text-slate-400 uppercase text-center pb-4">{day}</div>
                            ))}
                            {/* Simple render of 31 days */}
                            {[...Array(31)].map((_, i) => (
                                <div key={i} className={`h-24 border border-slate-50 rounded-2xl p-2 transition-all hover:bg-slate-50/50 ${i + 1 === 12 ? 'bg-emerald-50 border-emerald-100' : ''}`}>
                                    <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                                    {i + 1 === 12 && (
                                        <div className="mt-2 p-1.5 bg-[#003B2F] text-[9px] text-white font-bold rounded-lg truncate">
                                            Annual Leave
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SIDEBAR: Compliance & History (RHS - 1 Column) */}
                <div className="space-y-6">
                    {/* Sponsorship Warning Box */}
                    <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100">
                        <div className="flex items-center gap-3 mb-4 text-amber-700">
                            <AlertCircle size={20} />
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Statutory Notice</h4>
                        </div>
                        <p className="text-xs text-amber-800 leading-relaxed font-medium">
                            Sponsored employees must report any unauthorized absence exceeding 10 consecutive working days to the Home Office. Ensure all leave is approved in advance.
                        </p>
                    </div>

                    {/* Request History */}
                    <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white">
                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">Recent History</h4>
                        <div className="space-y-6">
                            {absences.map(item => (
                                <div key={item.id} className="flex justify-between items-start border-b border-white/10 pb-4">
                                    <div>
                                        <p className="text-sm font-bold">{item.type}</p>
                                        <p className="text-[10px] text-slate-400">{item.start} - {item.end}</p>
                                    </div>
                                    <span className="text-[9px] font-black uppercase px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md">
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* LEAVE REQUEST MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
                        <div className="bg-[#003B2F] p-8 text-white">
                            <h2 className="text-xl font-bold tracking-tight">Request Absence</h2>
                            <p className="text-emerald-200/60 text-xs mt-1 font-medium uppercase tracking-widest">Employee Statutory Reporting</p>
                        </div>

                        <div className="p-10 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leave Type</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold">
                                        <option>Annual Leave</option>
                                        <option>Sick Leave</option>
                                        <option>Unpaid (Authorized)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason for Absence</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold">
                                        <option>Personal Holiday</option>
                                        <option>Medical Appointment</option>
                                        <option>Family Emergency</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</label>
                                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date</label>
                                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold" />
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="flex gap-4">
                                    <Info className="text-slate-400" size={20} />
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Visa Compliance Check</p>
                                        <p className="text-[11px] text-slate-500 mt-1">This request will be logged as 'Paid Leave'. It does not impact your minimum salary threshold for CoS maintenance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-xs font-black uppercase text-slate-400">Cancel</button>
                            <button className="px-8 py-3 bg-[#003B2F] text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-emerald-900/20">Submit Request</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeAbsence;