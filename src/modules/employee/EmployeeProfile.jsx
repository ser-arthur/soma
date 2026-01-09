import React, { useState } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase,
    CreditCard, ShieldCheck, History, Edit3,
    Save, Globe, Building, Fingerprint, Lock
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/ui/Button';

const EmployeeProfile = ({ employeeType = 'Sponsored' }) => {
    const [isEditing, setIsEditing] = useState(false);

    const profileActions = [
        {
            label: isEditing ? 'Save Changes' : 'Edit Dossier',
            icon: isEditing ? Save : Edit3,
            onClick: () => setIsEditing(!isEditing)
        }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <PageHeader
                title="My Professional Dossier"
                subtitle="Employee Master Record"
                description="View and manage your institutional data. Changes to core identity or address details will be synchronized with the Statutory Filing system."
                icon={Fingerprint}
                actions={profileActions}
                stats={[
                    { label: 'Employment Status', value: 'Permanent' },
                    { label: 'Seniority', value: '4.2 Years' },
                    { label: 'Security Level', value: 'L3' }
                ]}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* LHS: CORE IDENTITY & ROLE */}
                <div className="xl:col-span-2 space-y-8">

                    {/* 1. Personal Identity */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <User size={18} className="text-[#064e3b]"/> Identity & Contact Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ProfileField label="Full Legal Name" value="James Alexander Smith" isEditing={isEditing} />
                            <ProfileField label="Work Email" value="j.smith@edgebricks.com" isEditing={false} />
                            <ProfileField label="Mobile Number" value="+44 7700 900000" isEditing={isEditing} />
                            <ProfileField label="Home Address" value="12 High Street, London, E1 6AN" isEditing={isEditing} isWide />
                        </div>
                    </div>

                    {/* 2. Professional Context */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Briefcase size={18} className="text-[#064e3b]"/> Institutional Placement
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ProfileField label="Job Title" value="Senior Systems Engineer" isEditing={false} />
                            <ProfileField label="Department" value="Engineering & Infrastructure" isEditing={false} />
                            <ProfileField label="Office Location" value="London HQ (The Shard)" isEditing={false} />
                            <ProfileField label="Line Manager" value="Sarah Jenkins" isEditing={false} />
                        </div>
                    </div>

                    {/* 3. Financial Logistics */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <CreditCard size={18} className="text-[#064e3b]"/> Banking & Payroll Setup
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ProfileField label="Bank Provider" value="HSBC Business Premium" isEditing={isEditing} />
                            <ProfileField label="Account Number" value="**** 5678" isEditing={isEditing} />
                            <ProfileField label="Tax Code" value="1257L" isEditing={false} />
                            <ProfileField label="National Insurance" value="QQ 12 34 56 C" isEditing={false} />
                        </div>
                    </div>
                </div>

                {/* RHS: STATUTORY STATUS & HISTORY */}
                <div className="xl:col-span-1 space-y-8">

                    {/* Eligibility Status (Conditional) */}
                    {employeeType === 'Sponsored' && (
                        <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                                    <ShieldCheck size={18}/> Work Eligibility
                                </h3>
                                <div className="space-y-6">
                                    <StatusItem label="Visa Subtype" value="Skilled Worker (Sponsorship)" />
                                    <StatusItem label="CoS Reference" value="C4G8H2J1K9L" />
                                    <StatusItem label="Valid Until" value="12 Oct 2028" />

                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Verification Pulse</p>
                                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-xs font-bold uppercase tracking-tight">HMRC / UKVI Synced</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Lock className="absolute right-[-30px] bottom-[-30px] text-white/5" size={180} />
                        </div>
                    )}

                    {/* Verification Timeline */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <History size={18} className="text-[#064e3b]"/> Audit Trail
                        </h3>
                        <div className="space-y-6">
                            {[
                                { date: 'Jan 12', event: 'Right to Work Verified', status: 'Success' },
                                { date: 'Dec 01', event: 'Address Update Reported', status: 'Logged' },
                                { date: 'Nov 15', event: 'CoS Allocation Confirmed', status: 'Active' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 border-l-2 border-slate-50 pl-6 relative">
                                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#064e3b]"></div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">{item.date}</p>
                                        <p className="text-xs font-bold text-slate-800">{item.event}</p>
                                        <p className="text-[9px] font-black text-emerald-600 uppercase mt-1 tracking-widest">{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components for clean code
const ProfileField = ({ label, value, isEditing, isWide = false }) => (
    <div className={isWide ? 'md:col-span-2' : ''}>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        {isEditing ? (
            <input
                type="text"
                defaultValue={value}
                className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-[#064e3b]/20 outline-none"
            />
        ) : (
            <p className="text-sm font-bold text-slate-700 p-1">{value}</p>
        )}
    </div>
);

const StatusItem = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-black text-white">{value}</span>
    </div>
);

export default EmployeeProfile;