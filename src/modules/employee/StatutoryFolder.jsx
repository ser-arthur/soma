import React, { useState } from 'react';
import {
    ShieldCheck, FileText, Upload, AlertTriangle,
    CheckCircle, Trash2, Eye, Clock, RefreshCw, Plus
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';

const StatutoryFolder = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Identity');

    const [documents, setDocuments] = useState([
        {
            id: 1,
            name: 'Current Passport',
            category: 'Identity',
            status: 'Verified',
            expiry: '2028-05-12',
            verifiedDate: '2024-01-15',
            isVerified: true
        },
        {
            id: 2,
            name: 'BRP (Front & Back)',
            category: 'Visa/RTW',
            status: 'Expiring Soon',
            expiry: '2026-03-20',
            verifiedDate: '2024-01-15',
            isVerified: true
        },
        {
            id: 3,
            name: 'Enhanced DBS Certificate',
            category: 'Compliance',
            status: 'Pending Review',
            expiry: '2027-11-01',
            verifiedDate: null,
            isVerified: false
        }
    ]);

    const handleRequestUpdate = (category) => {
        setSelectedCategory(category);
        setIsUploadModalOpen(true);
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Verified': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Expiring Soon': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Pending Review': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-slate-50 text-slate-700';
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <PageHeader
                title="Statutory Folder"
                subtitle="Compliance Dossier"
                description="Secure vault for Right to Work and professional identity documents. Verified documents require an update request to maintain audit history."
                icon={ShieldCheck}
                actions={[{ label: 'Upload New Document', icon: Plus, primary: true, onClick: () => setIsUploadModalOpen(true) }]}
                stats={[
                    { label: 'Active Docs', value: documents.length },
                    { label: 'Pending Audit', value: '1' },
                    { label: 'Days to Expiry', value: '412' }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${getStatusStyle(doc.status)} border`}>
                                <FileText size={24} />
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(doc.status)}`}>
                                {doc.status}
                            </div>
                        </div>

                        <div className="space-y-1 mb-8">
                            <h3 className="font-black text-slate-900 text-lg tracking-tight">{doc.name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.category}</p>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-slate-50">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-slate-400 uppercase tracking-widest">Expiry Date</span>
                                <span className={`font-black ${doc.status === 'Expiring Soon' ? 'text-amber-600' : 'text-slate-900'}`}>
                                    {doc.expiry}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all">
                                <Eye size={14} /> View
                            </button>

                            {doc.isVerified ? (
                                <button
                                    onClick={() => handleRequestUpdate(doc.category)}
                                    className="flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all"
                                >
                                    <RefreshCw size={14} /> Request Update
                                </button>
                            ) : (
                                <button className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">
                                    <Trash2 size={14} /> Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* UPLOAD MODAL */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 animate-in zoom-in-95">
                        <div className="bg-[#003B2F] p-8 text-white">
                            <h2 className="text-xl font-bold tracking-tight">Upload Statutory Document</h2>
                            <p className="text-emerald-200/60 text-[10px] mt-1 font-black uppercase tracking-widest">Institutional Compliance Submission</p>
                        </div>

                        <div className="p-10 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold"
                                >
                                    <option>Identity (Passport)</option>
                                    <option>Visa/RTW (BRP/Share Code)</option>
                                    <option>Professional Credentials</option>
                                    <option>Proof of Address</option>
                                </select>
                            </div>

                            <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center space-y-4 hover:border-emerald-500 transition-colors cursor-pointer group">
                                <div className="p-4 bg-slate-50 rounded-full text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                                    <Upload size={32} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">Click to upload or drag and drop</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">PDF, PNG, or JPG (Max 10MB)</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry Date</label>
                                <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold" />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button onClick={() => setIsUploadModalOpen(false)} className="px-6 py-3 text-[10px] font-black uppercase text-slate-400">Cancel</button>
                                <button className="px-8 py-3 bg-[#003B2F] text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-900/20">Submit for Verification</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatutoryFolder;