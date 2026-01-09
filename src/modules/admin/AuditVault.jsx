import React, { useState, useMemo } from 'react';
import {
    Folder, FileText, Search, Download, ShieldCheck, RefreshCw,
    Filter, HardDrive, Clock, CheckCircle, XCircle, Eye,
    Banknote, Inbox, Archive, User, AlertCircle, Lock
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';

/**
 * ============================================================================
 * VERIFICATION MODAL COMPONENT (Internal to Vault)
 * ============================================================================
 */
const VerificationModal = ({ isOpen, onClose, request }) => {
    if (!isOpen || !request) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[3rem] w-full max-w-5xl h-[85vh] overflow-hidden flex shadow-2xl animate-in zoom-in-95 duration-300">

                {/* LHS: Document Preview Area */}
                <div className="flex-1 bg-slate-100 flex flex-col relative">
                    <div className="absolute top-6 left-6 z-10 flex gap-2">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-slate-200/50">
                            Source: Employee Portal Upload
                        </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-12 text-center">
                        <div className="w-full h-full bg-white rounded-2xl border border-slate-200 shadow-inner flex flex-col items-center justify-center text-slate-300 p-10">
                            <FileText size={80} strokeWidth={1} />
                            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Previewing: {request.details}</p>
                            <p className="text-[9px] mt-2 italic max-w-xs text-slate-400">In a live environment, the PDF or Image renderer would display the scanned document here for manual inspection.</p>
                        </div>
                    </div>

                    <div className="p-6 bg-white/50 border-t border-slate-200 flex justify-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-[10px] font-black uppercase shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                            <Download size={16} /> Download Original File
                        </button>
                    </div>
                </div>

                {/* RHS: Action Panel */}
                <div className="w-[400px] border-l border-slate-100 flex flex-col bg-white">
                    <div className="p-10 flex-1 overflow-y-auto space-y-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">Verify Evidence</h2>
                            <p className="text-xs text-slate-500 font-medium tracking-tight">Perform a statutory check against the master record.</p>
                        </div>

                        {/* Personnel Context */}
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Linked Personnel</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#003B2F] rounded-full flex items-center justify-center font-black text-white text-xs">
                                    {request.employee.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">{request.employee}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Active Sponsored Tier</p>
                                </div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Checklist</p>
                            {["Full name matches profile", "Document is within validity", "Stamp/Watermark is legible"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded border border-emerald-500 flex items-center justify-center bg-emerald-50">
                                        <CheckCircle size={10} className="text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-600">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex gap-3">
                            <AlertCircle className="text-amber-600 shrink-0" size={20} />
                            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                                Approval will lock this document in the permanent archive and notify the employee of successful verification.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-3">
                        <button className="w-full py-4 bg-[#ECFDF5] text-[#059669] hover:bg-[#059669] hover:text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-[#D1FAE5] shadow-sm">
                            <CheckCircle size={18} /> Confirm & Archive
                        </button>
                        <button className="w-full py-4 text-slate-400 hover:text-red-500 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <XCircle size={18} /> Reject & Notify
                        </button>
                        <button onClick={onClose} className="w-full py-2 text-[10px] text-slate-300 font-bold uppercase tracking-widest">Cancel Review</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * ============================================================================
 * MAIN AUDIT VAULT COMPONENT
 * ============================================================================
 */
const AuditVault = () => {
    const [viewMode, setViewMode] = useState('Queue');
    const [selectedFolder, setSelectedFolder] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);

    // EXPANDED LIVE VERIFICATION DATA
    const pendingActions = [
        { id: 'AUD-902', employee: 'Sarah Chen', type: 'Bank Detail Update', date: 'Today', priority: 'Medium', icon: Banknote, details: 'Account Change: HSBC x-9921' },
        { id: 'AUD-905', employee: 'James Wilson', type: 'BRP Renewal', date: 'Yesterday', priority: 'High', icon: FileText, details: 'Biometric Card - Scan #9921' },
        { id: 'AUD-910', employee: 'Amara Okafor', type: 'Passport Update', date: '2 Hours Ago', priority: 'High', icon: User, details: 'International Passport: NG-9912' },
        { id: 'AUD-915', employee: 'Liam O’Connor', type: 'DBS Certificate', date: '3 Days Ago', priority: 'Low', icon: ShieldCheck, details: 'Enhanced Disclosure Check' }
    ];

    // EXPANDED ARCHIVE DATA
    const archiveData = [
        { id: 1, title: 'Passport Scan', emp: 'Alex Johnson', empId: 'EMP-00124', category: 'Identity', status: 'Verified', date: '2025-01-05', type: 'PDF' },
        { id: 2, title: 'BRP Card (2024)', emp: 'Sarah Chen', empId: 'EMP-00982', category: 'RTW', status: 'Verified', date: '2025-01-08', type: 'JPG' },
        { id: 3, title: 'P60 Tax Certificate', emp: 'Alex Johnson', empId: 'EMP-00124', category: 'Payroll', status: 'Verified', date: '2024-04-05', type: 'PDF' },
        { id: 4, title: 'Employment Contract', emp: 'James Wilson', empId: 'EMP-00451', category: 'Recruitment', status: 'Verified', date: '2024-01-10', type: 'PDF' },
        { id: 5, title: 'BRP Card (2023)', emp: 'Sarah Chen', empId: 'EMP-00982', category: 'RTW', status: 'Verified', date: '2023-01-02', type: 'PDF' },
        { id: 6, title: 'Reference Letter - Google', emp: 'Sarah Chen', empId: 'EMP-00982', category: 'Recruitment', status: 'Verified', date: '2023-12-15', type: 'PDF' },
        { id: 7, title: 'HMRC Tax Code Notice', emp: 'Liam O’Connor', empId: 'EMP-00772', category: 'Payroll', status: 'Verified', date: '2025-01-02', type: 'PDF' }
    ];

    const filteredArchive = useMemo(() => {
        return archiveData.filter(doc => {
            const matchesFolder = selectedFolder === 'All' || doc.category === selectedFolder;
            const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.emp.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFolder && matchesSearch;
        });
    }, [selectedFolder, searchQuery]);

    const categories = ['All', 'Identity', 'RTW', 'Recruitment', 'Payroll', 'Compliance'];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <PageHeader
                title="Statutory Records"
                subtitle="Compliance Management"
                description="Secure central repository for verified personnel evidence. Process incoming verification requests or access historical records for audit readiness."
                icon={ShieldCheck}
                stats={[
                    { label: 'Pending Review', value: pendingActions.length },
                    { label: 'Audit Health', value: '98%', trend: 'down' }
                ]}
            />

            {/* Toggle Mode */}
            <div className="flex bg-white p-2 rounded-[2.5rem] border border-slate-100 w-fit shadow-sm">
                <button onClick={() => setViewMode('Queue')} className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'Queue' ? 'bg-[#0f172a] text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}>
                    <Inbox size={18} /> Verification Queue
                </button>
                <button onClick={() => setViewMode('Archive')} className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'Archive' ? 'bg-[#0f172a] text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}>
                    <Archive size={18} /> Records Archive
                </button>
            </div>

            {viewMode === 'Queue' ? (
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-500">
                    <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Awaiting Institutional Review</h3>
                        <span className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest">
                            <Clock size={14} /> {pendingActions.length} Pending Actions
                        </span>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {pendingActions.map((action) => (
                            <div key={action.id} className="p-10 hover:bg-slate-50/50 transition-all group">
                                <div className="flex flex-wrap lg:flex-nowrap items-center gap-8">
                                    <div className="p-5 bg-slate-100 rounded-[1.5rem] text-slate-400 group-hover:bg-[#003B2F] group-hover:text-white transition-all shadow-sm">
                                        <action.icon size={24} />
                                    </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="font-black text-slate-900 tracking-tight">{action.type}</h4>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${action.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {action.priority}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 font-bold uppercase flex items-center gap-2 tracking-tight">
                                            <User size={12} className="text-slate-300" /> {action.employee} <span className="text-slate-200">|</span> {action.details}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-auto">
                                        <button onClick={() => setSelectedRequest(action)} className="p-4 bg-white border border-slate-100 text-slate-400 hover:text-slate-900 rounded-2xl transition-all shadow-sm">
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedRequest(action)}
                                            className="px-6 py-4 bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5] hover:bg-[#059669] hover:text-white rounded-2xl text-[10px] font-black uppercase transition-all shadow-sm"
                                        >
                                            Approve Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                    {/* Folders */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedFolder(cat)} className={`p-6 rounded-[2rem] border transition-all text-left flex flex-col gap-4 ${selectedFolder === cat ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-xl' : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'}`}>
                                <Folder size={20} className={selectedFolder === cat ? 'text-emerald-400' : 'text-slate-300'} />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">{cat}</span>
                            </button>
                        ))}
                    </div>

                    {/* Table Area */}
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between gap-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="text" placeholder="Search by personnel or document title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-16 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-xs font-bold w-full outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner" />
                            </div>
                            <button className="px-6 py-4 bg-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all flex items-center gap-2">
                                <Filter size={16} /> Advanced Filter
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                <tr>
                                    <th className="px-10 py-6">Evidence Identity</th>
                                    <th className="px-6 py-6">Linked Personnel</th>
                                    <th className="px-6 py-6 text-center">Status</th>
                                    <th className="px-10 py-6 text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                {filteredArchive.map(doc => (
                                    <tr key={doc.id} className="group hover:bg-slate-50/80 transition-all">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="p-3 bg-slate-100 rounded-xl text-slate-400 group-hover:bg-[#003B2F] group-hover:text-white transition-all">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 leading-none mb-1.5">{doc.title}</p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{doc.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-8">
                                            <p className="text-xs font-black text-slate-900 leading-none">{doc.emp}</p>
                                            <p className="text-[10px] text-slate-400 font-black tracking-widest mt-1.5 uppercase">{doc.empId}</p>
                                        </td>
                                        <td className="px-6 py-8 text-center">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                                    <CheckCircle size={10} /> Verified
                                                </span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button className="p-3 text-slate-300 hover:text-slate-900 transition-all"><Download size={20} /></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Verification Modal Hook */}
            <VerificationModal
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                request={selectedRequest}
            />
        </div>
    );
};

export default AuditVault;