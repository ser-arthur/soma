import React from 'react';
import { BookOpen, FileText, Download, Shield, ExternalLink, Search } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

const Handbook = () => {
    const categories = [
        {
            title: "Core Governance",
            docs: [
                { name: "Employee Code of Conduct", size: "1.2 MB" },
                { name: "Sponsorship Compliance Manual", size: "2.4 MB", essential: true },
                { name: "Data Protection & GDPR", size: "0.8 MB" }
            ]
        },
        {
            title: "Benefits & Welfare",
            docs: [
                { name: "Healthcare & Dental Scheme", size: "1.5 MB" },
                { name: "Pension Auto-Enrolment Guide", size: "1.1 MB" },
                { name: "Mental Health Support Resources", size: "3.2 MB" }
            ]
        }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <PageHeader
                title="Company Handbook"
                subtitle="Institutional Knowledge"
                description="Access all official company policies, procedure manuals, and statutory guidance. These documents form the basis of your employment agreement."
                icon={BookOpen}
                stats={[
                    { label: 'Version', value: '2025.1.4' },
                    { label: 'Last Updated', value: 'Jan 2025' },
                    { label: 'Policies', value: '12' }
                ]}
            />

            {/* Search Bar Placeholder */}
            <div className="max-w-2xl relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search for policies (e.g. 'maternity leave')..."
                    className="w-full bg-white border border-slate-100 rounded-3xl py-5 pl-16 pr-6 text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {categories.map((cat, idx) => (
                    <div key={idx} className="space-y-6">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{cat.title}</h3>
                        <div className="space-y-3">
                            {cat.docs.map((doc, dIdx) => (
                                <div key={dIdx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-5">
                                        <div className={`p-3 rounded-xl ${doc.essential ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'} group-hover:bg-slate-900 group-hover:text-white transition-all`}>
                                            {doc.essential ? <Shield size={20} /> : <FileText size={20} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 tracking-tight">{doc.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-slate-50 text-slate-300 hover:text-slate-900 rounded-xl transition-all">
                                        <Download size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Statutory Disclaimer */}
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 text-center max-w-3xl mx-auto">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    By accessing these documents, you acknowledge that you are bound by the current versions of the institutional policies.
                    Changes to policies are communicated via email and require digital acknowledgment.
                </p>
            </div>
        </div>
    );
};

export default Handbook;