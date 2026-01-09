import React, { useState, useMemo } from 'react';
import {
    CreditCard, Zap, FileCheck, Plus, Download,
    ExternalLink, TrendingUp, ShieldAlert, Clock, ShieldCheck,
    ArrowUpRight, ArrowDownRight, Info, AlertTriangle, Filter, Search,
    RefreshCw, X, CheckCircle, Globe, LayoutGrid, ChevronRight, ListFilter
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';

/**
 * ============================================================================
 * SYNC PROVIDER MODAL (Institutional Integration)
 * ============================================================================
 */
const SyncModal = ({ isOpen, onClose }) => {
    const [syncStep, setSyncStep] = useState(1);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Payroll Synchronization</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={18} className="text-slate-400" />
                    </button>
                </div>

                <div className="p-10">
                    {syncStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center space-y-2">
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">Select Provider</h4>
                                <p className="text-xs text-slate-500 font-medium">Connect to your external finance stack to reconcile earnings.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {['Xero Payroll', 'ADP Global', 'Sage 50 Cloud'].map((provider) => (
                                    <button
                                        key={provider}
                                        onClick={() => setSyncStep(2)}
                                        className="w-full p-5 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                                    >
                                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{provider}</span>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {syncStep === 2 && (
                        <div className="py-12 text-center space-y-6">
                            <div className="relative w-20 h-20 mx-auto">
                                <RefreshCw size={80} className="text-emerald-500 animate-spin opacity-20" />
                                <Zap size={32} className="absolute inset-0 m-auto text-emerald-600 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-slate-900">Reconciling Ledgers</h4>
                                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mt-2">Fetching Statutory Documents...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * ============================================================================
 * MAIN COMPENSATION COMPONENT
 * ============================================================================
 */
const Compensation = () => {
    const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Risks');
    const [searchQuery, setSearchQuery] = useState('');

    const alertCount = 3;

    const headerActions = [
        { label: 'Sync Payroll Provider', icon: Zap, primary: true, onClick: () => setIsSyncModalOpen(true) },
        { label: 'Export HMRC Report', icon: Download, onClick: () => {} }
    ];

    // Extended dataset for "Large-Size" demonstration
    const personnelLedger = [
        { name: 'Amara Okafor', id: 'EMP-552', gross: 3100, hours: 40, type: 'Sponsored', floor: 3225, status: 'Breach Risk', lastSync: '1h ago', dept: 'Operations' },
        { name: 'Sarah Chen', id: 'EMP-982', gross: 3250, hours: 37.5, type: 'Sponsored', floor: 3225, status: 'Near Threshold', lastSync: '2h ago', dept: 'Engineering' },
        { name: 'Alex Johnson', id: 'EMP-124', gross: 4100, hours: 40, type: 'Local', floor: 1850, status: 'Compliant', lastSync: '2h ago', dept: 'Finance' },
        { name: 'James Wilson', id: 'EMP-451', gross: 3800, hours: 37.5, type: 'Sponsored', floor: 3225, status: 'Compliant', lastSync: '2h ago', dept: 'Engineering' },
        { name: 'Zoe Baxter', id: 'EMP-102', gross: 5200, hours: 37.5, type: 'Local', floor: 1850, status: 'Compliant', lastSync: '5h ago', dept: 'Legal' },
    ];

    // SMART SORTING & FILTERING LOGIC
    const filteredLedger = useMemo(() => {
        let results = [...personnelLedger];

        // 1. Filter by Search
        if (searchQuery) {
            results = results.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Filter by Tab Logic
        if (activeTab === 'Risks') {
            results = results.filter(p => p.gross < (p.floor + 150));
        }

        // 3. Tab-Specific Sorting
        if (activeTab === 'All Personnel') {
            // Large Company alphabetical order
            results.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            // Risk-based sorting (lowest margin first)
            results.sort((a, b) => (a.gross - a.floor) - (b.gross - b.floor));
        }

        return results;
    }, [activeTab, searchQuery]);

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20 relative">

            {/* FILTER DRAWER (LHS Side-Panel for Large Companies) */}
            {isFilterOpen && (
                <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-[110] border-l border-slate-100 p-10 animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Filter Ledger</h3>
                        <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={20}/></button>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Operations</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personnel Tier</label>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-3 text-xs font-bold text-slate-600">
                                    <input type="checkbox" className="rounded border-slate-300" /> Sponsored Only
                                </label>
                                <label className="flex items-center gap-3 text-xs font-bold text-slate-600">
                                    <input type="checkbox" className="rounded border-slate-300" /> Local Only
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <PageHeader
                title="Compensation & Compliance"
                subtitle="Financial Governance"
                description="Holistic oversight of institutional payroll integrity. Monitor salary floors, statutory liabilities, and real-time variance across the entire global workforce."
                icon={CreditCard}
                actions={headerActions}
                stats={[
                    { label: 'Monthly Liability', value: '£184,200' },
                    { label: 'Threshold Alerts', value: alertCount.toString(), trend: 'up' },
                    { label: 'Payroll Health', value: '96.4%' }
                ]}
            />

            <SyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />

            {/* TOP ROW: DUAL-CORE PULSE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">Statutory Quota</h4>
                            <ShieldCheck className="text-emerald-500/50" size={24} />
                        </div>
                        <div className="flex items-baseline gap-4 mb-2">
                            <span className="text-7xl font-black tracking-tighter">08</span>
                            <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">CoS Units</span>
                        </div>
                        <p className="text-slate-400 text-xs font-medium mb-10">Available for international assignment</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-slate-500">
                                <span>Utilization</span>
                                <span>72%</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '72%' }}></div>
                            </div>
                        </div>
                    </div>
                    <Zap className="absolute right-[-30px] bottom-[-30px] text-white/5" size={200} />
                </div>

                <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter">Threshold Integrity Monitor</h3>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Global Salary Floor Reconciliation</p>
                        </div>
                        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 text-rose-600 animate-pulse">
                            <AlertTriangle size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-50 my-6">
                        {[
                            { label: 'Avg Salary', value: '£42,850' },
                            { label: 'ISC Forecast', value: '£12,000' },
                            { label: 'Hourly Median', value: '£22.40' },
                            { label: 'Audit Risk', value: 'Low', color: 'text-emerald-500' }
                        ].map((s, i) => (
                            <div key={i}>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">{s.label}</p>
                                <p className={`text-xl font-black tracking-tight ${s.color || 'text-slate-900'}`}>{s.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                        <Info size={18} className="text-amber-600 shrink-0" />
                        <p className="text-[11px] text-amber-800 font-medium">
                            <span className="font-black italic">Attention:</span> {alertCount} employees are within 5% of their statutory salary floor. Review variances below.
                        </p>
                    </div>
                </div>
            </div>

            {/* COMPENSATION LEDGER (Tabbed for Scale) */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-10 border-b border-slate-50 bg-slate-50/30">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex bg-white p-1.5 rounded-[1.5rem] border border-slate-200">
                            {['Risks', 'All Personnel', 'Variances'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        activeTab === tab ? 'bg-[#0f172a] text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by name or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                                />
                            </div>
                            <button onClick={() => setIsFilterOpen(true)} className="p-4 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 transition-all">
                                <ListFilter size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                        <tr>
                            <th className="px-10 py-6">Personnel</th>
                            <th className="px-6 py-6">Monthly Gross</th>
                            <th className="px-6 py-6">Hourly</th>
                            <th className="px-6 py-6">MoM Variance</th>
                            <th className="px-6 py-6">Compliance Floor</th>
                            <th className="px-10 py-6 text-right">Records</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {filteredLedger.map((pay, i) => {
                            const hourly = (pay.gross / (pay.hours * 4.33)).toFixed(2);
                            const isAtRisk = pay.gross < (pay.floor + 150);

                            return (
                                <tr key={i} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#0f172a] rounded-2xl flex items-center justify-center text-xs font-black text-emerald-400 shadow-inner">
                                                {pay.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 mb-1">{pay.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${pay.type === 'Sponsored' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                                        {pay.type}
                                                    </span>
                                                    {isAtRisk && (
                                                        <span className="text-[8px] font-black uppercase text-rose-500 flex items-center gap-1">
                                                            <AlertTriangle size={10} /> {pay.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-8">
                                        <p className="text-sm font-black text-slate-900 tracking-tight">£{pay.gross.toLocaleString()}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">Synced {pay.lastSync}</p>
                                    </td>
                                    <td className="px-6 py-8 text-xs font-bold text-slate-500 font-mono tracking-tight">£{hourly}/hr</td>
                                    <td className="px-6 py-8">
                                        <div className={`flex items-center gap-1 text-[10px] font-black ${pay.gross > 3500 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {pay.gross > 3500 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {pay.gross > 3500 ? '2.1%' : '1.4%'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-8">
                                        <div className="flex flex-col gap-2 w-32">
                                            <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-tight">
                                                <span>Floor</span>
                                                <span>£{pay.floor}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                                                <div
                                                    className={`h-full rounded-full ${isAtRisk ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]'}`}
                                                    style={{ width: isAtRisk ? '96%' : '85%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-3 text-slate-300 hover:text-slate-900 transition-all bg-slate-50 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 shadow-sm">
                                            <ExternalLink size={20} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                {activeTab === 'All Personnel' && (
                    <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Showing {filteredLedger.length} of {personnelLedger.length} Personnel Assets</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous</button>
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compensation;