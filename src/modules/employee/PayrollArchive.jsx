import React, { useState } from 'react';
import {
    FileText, Download, Calendar, TrendingUp,
    ShieldCheck, Package, Filter, ChevronRight,
    ArrowUpRight, CreditCard, Banknote, AlertCircle, CheckCircle, Info
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';

/**
 * ============================================================================
 * NEXUS HR - PAYROLL & FINANCE MODULE
 * ============================================================================
 */

const PayrollArchive = () => {
    const [filterYear, setFilterYear] = useState('2024/25');
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [requestSubmitted, setRequestSubmitted] = useState(false);

    // Mock years - can scale back to year of hire (e.g., 2000)
    const availableYears = ['2024/25', '2023/24', '2022/23', '2021/22', '2020/21'];

    const archiveActions = [
        { label: 'Download Mortgage Pack', icon: Package, onClick: () => {} },
        { label: 'Update Bank Details', icon: CreditCard, onClick: () => setIsBankModalOpen(true) }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <PageHeader
                title="Payroll & Finance"
                subtitle="Financial Records"
                description="Secure repository for historical earnings and statutory HMRC documentation like P60s. Essential for visa verification and mortgage applications."
                icon={Banknote}
                actions={archiveActions}
                stats={[
                    { label: 'Total Earnings (YTD)', value: '£38,250' },
                    { label: 'Tax Paid (YTD)', value: '£7,140' },
                    { label: 'Current Tax Code', value: '1257L' }
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* 1. FINANCIAL SUMMARY (LHS) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Tax Year Progress</h4>
                        <div className="relative h-4 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden mb-4">
                            <div className="h-full bg-[#064e3b] w-[75%] rounded-full"></div>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            You have completed <span className="text-slate-900 font-bold">9 of 12</span> months in the current cycle.
                        </p>
                    </div>

                    <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">Upcoming Pay Date</h4>
                        <p className="text-3xl font-black mb-2 tracking-tighter">28 March</p>
                        <p className="text-xs text-slate-400 font-medium">Status: <span className="text-emerald-400 font-bold">Processing</span></p>
                        <ArrowUpRight className="absolute right-[-10px] bottom-[-10px] text-white/5" size={120} />
                    </div>
                </div>

                {/* 2. PAYSLIPS & REGISTRY (RHS) */}
                <div className="lg:col-span-3 space-y-8">
                    {/* DYNAMIC YEAR SELECTOR */}
                    <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Period:</label>
                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className="bg-slate-50 border-none text-sm font-black text-slate-900 rounded-xl px-6 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                            >
                                {availableYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                            <AlertCircle size={14} className="text-slate-300" />
                            Showing records for the selected tax year
                        </div>
                    </div>

                    {/* DOCUMENTS TABLE */}
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/30">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Earnings Registry</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                            <tr>
                                <th className="px-10 py-6">Period</th>
                                <th className="px-6 py-6">Document Type</th>
                                <th className="px-6 py-6">Net Payment</th>
                                <th className="px-10 py-6 text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                            {[
                                { period: 'February 2025', type: 'Payslip', amount: '£2,840', isStatutory: false },
                                { period: 'January 2025', type: 'Payslip', amount: '£2,840', isStatutory: false },
                                { period: 'Tax Year 2023/24', type: 'P60 Certificate', amount: '-', isStatutory: true },
                                { period: 'December 2024', type: 'Payslip', amount: '£2,840', isStatutory: false }
                            ].map((doc, i) => (
                                <tr key={i} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-10 py-6 font-black text-slate-900">{doc.period}</td>
                                    <td className="px-6 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${doc.isStatutory ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {doc.type}
                                            </span>
                                    </td>
                                    <td className="px-6 py-6 text-sm font-black text-slate-900">{doc.amount}</td>
                                    <td className="px-10 py-6 text-right">
                                        <button className="p-3 bg-slate-50 text-slate-300 hover:text-slate-900 transition-all rounded-xl">
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* BANK DETAILS MODAL */}
            {isBankModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
                        <div className="bg-[#003B2F] p-8 text-white">
                            <h2 className="text-xl font-bold tracking-tight">Update Bank Details</h2>
                            <p className="text-emerald-200/60 text-[10px] mt-1 font-black uppercase tracking-widest">Administrative Verification Required</p>
                        </div>

                        <div className="p-10 space-y-6">
                            {!requestSubmitted ? (
                                <>
                                    <div className="bg-amber-50 p-5 rounded-2xl flex gap-4 border border-amber-100">
                                        <AlertCircle className="text-amber-600 shrink-0" size={20}/>
                                        <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                                            Submitting this form will notify the Admin and Finance team. For security, changes will only take effect after institutional verification.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Holder Name</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="FULL NAME AS PER BANK" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Number</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold outline-none" placeholder="8 DIGITS" maxLength="8" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort Code</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold outline-none" placeholder="00-00-00" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4">
                                        <button onClick={() => setIsBankModalOpen(false)} className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600">Cancel</button>
                                        <button
                                            onClick={() => setRequestSubmitted(true)}
                                            className="px-8 py-3 bg-[#003B2F] text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-900/20"
                                        >
                                            Request Update
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95">
                                    <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="font-black text-slate-900 uppercase tracking-tight">Request Sent</h3>
                                    <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                                        Your request has been queued. An Admin will review the change. You will receive an email once the update is confirmed.
                                    </p>
                                    <button
                                        onClick={() => {setIsBankModalOpen(false); setRequestSubmitted(false);}}
                                        className="mt-6 px-10 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase"
                                    >
                                        Return to Payroll
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayrollArchive;