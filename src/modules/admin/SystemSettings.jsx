import React, { useState } from 'react';
import {
    Settings, Shield, Bell, Zap, Database,
    Lock, Globe, Save, RefreshCw, AlertCircle,
    Building2, Terminal, Fingerprint, Eye,
    ShieldAlert, Plus, Scale, Calendar
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';

/**
 * ============================================================================
 * SYSTEM CONFIGURATION (The Institutional Brain)
 * ============================================================================
 */
const SystemSettings = () => {
    const [activeSection, setActiveSection] = useState('regulatory');

    const sections = [
        { id: 'regulatory', label: 'Compliance & Logic', icon: Shield },
        { id: 'structure', label: 'Org & Workforce', icon: Building2 },
        { id: 'integrations', label: 'Institutional Bridges', icon: Zap },
        { id: 'notifications', label: 'Watchdog Alerts', icon: Bell },
        { id: 'security', label: 'Access & Security', icon: Lock },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20">
            <PageHeader
                title="System Configuration"
                subtitle="Institutional Control Center"
                description="Command center for organizational policy and regulatory oversight. Configure the foundational rules for your workforce and manage the automated watchdogs that safeguard your operations."
                icon={Settings}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeSection === section.id
                                    ? 'bg-[#0f172a] text-white shadow-xl'
                                    : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100/50'
                            }`}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-emerald-400' : 'text-slate-300'} />
                            {section.label}
                        </button>
                    ))}
                </div>

                {/* Main Settings Panel */}
                <div className="lg:col-span-3 space-y-8">

                    {/* 1. REGULATORY & STATUTORY LOGIC */}
                    {activeSection === 'regulatory' && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                                    <Scale size={20} className="text-emerald-600"/> Global Statutory Standards
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skilled Worker Base Floor</label>
                                        <input type="text" defaultValue="£38,700" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-black text-slate-700 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                                        <p className="text-[9px] text-slate-400 font-bold uppercase italic">Applicable for Sponsored Tier 2 Assets</p>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Safety Buffer</label>
                                        <select className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-black text-slate-700 outline-none cursor-pointer">
                                            <option>5% Above Minimum (Standard)</option>
                                            <option>10% Above Minimum (High Risk)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                                    <Calendar size={20} className="text-emerald-600"/> Leave & Attendance Logic
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standard Leave Allowance</label>
                                        <input type="text" defaultValue="28 Days" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-black text-slate-700 outline-none" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Max Carry-Over (Days)</label>
                                        <input type="number" defaultValue="5" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-black text-slate-700 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. ORG STRUCTURE */}
                    {activeSection === 'structure' && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Workforce Segmentation</h3>
                                <div className="space-y-6">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Operational Departments</p>
                                        <div className="flex flex-wrap gap-3">
                                            {['Engineering', 'Product', 'Legal', 'Operations', 'Finance'].map(dept => (
                                                <span key={dept} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm">{dept}</span>
                                            ))}
                                            <button className="px-5 py-2.5 border border-dashed border-slate-300 rounded-xl text-xs font-black text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all">+ Add Unit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. INTEGRATIONS */}
                    {activeSection === 'integrations' && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Global Data Bridges</h3>
                                    <button className="px-4 py-2 bg-[#0f172a] text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Add New Bridge</button>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: 'UKVI Government Gateway', status: 'Active', icon: Globe, desc: 'Syncs Right to Work (RTW) and CoS allocation status.' },
                                        { name: 'Xero Cloud Payroll', status: 'Connected', icon: Zap, desc: 'Monthly salary reconciliation and gross pay auditing.' },
                                        { name: 'AWS Statutory Archive', status: 'Live', icon: Database, desc: 'Encrypted storage for regulatory audit evidence.' }
                                    ].map((integ, i) => (
                                        <div key={i} className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:border-emerald-500 hover:bg-white transition-all group">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm text-slate-300 group-hover:text-emerald-500 transition-colors">
                                                        <integ.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">{integ.name}</p>
                                                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{integ.status}</span>
                                                    </div>
                                                </div>
                                                <RefreshCw size={16} className="text-slate-200 group-hover:text-slate-400 cursor-pointer" />
                                            </div>
                                            <p className="text-[11px] text-slate-500 font-medium pl-[60px] leading-relaxed">{integ.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. WATCHDOGS */}
                    {activeSection === 'notifications' && (
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Automated Watchdogs</h3>
                            <div className="space-y-4">
                                {[
                                    { title: 'Visa Expiry Warning', desc: 'Alerts HR at 90, 60, and 30 day thresholds.', icon: ShieldAlert },
                                    { title: 'Threshold Breach', desc: 'Alerts Finance if pay drops below statutory floors.', icon: AlertCircle },
                                    { title: 'Document Gap', desc: 'Identifies missing Appendix D evidence files.', icon: Bell }
                                ].map((alert, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 rounded-[2rem] transition-all">
                                        <div className="flex gap-4">
                                            <div className="p-3 bg-slate-100 rounded-xl text-slate-400"><alert.icon size={20}/></div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 mb-1">{alert.title}</p>
                                                <p className="text-[11px] text-slate-500 font-medium">{alert.desc}</p>
                                            </div>
                                        </div>
                                        <div className="h-6 w-11 bg-emerald-500 rounded-full p-1 flex justify-end">
                                            <div className="h-4 w-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. SECURITY */}
                    {activeSection === 'security' && (
                        <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                            <div className="relative z-10 space-y-10">
                                <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Access Protocols</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                                        <Fingerprint className="text-emerald-400" size={24}/>
                                        <p className="text-xs font-black uppercase tracking-widest">Biometric MFA</p>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">Require biometric verification for Level 1 access.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                                        <Eye className="text-emerald-400" size={24}/>
                                        <p className="text-xs font-black uppercase tracking-widest">Full Audit Log</p>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">Track every statutory data point change in real-time.</p>
                                    </div>
                                </div>
                            </div>
                            <Lock className="absolute right-[-40px] bottom-[-40px] text-white/5" size={220} />
                        </div>
                    )}

                    {/* GLOBAL FOOTER ACTIONS */}
                    <div className="flex justify-end gap-4 pt-8">
                        <button className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Discard</button>
                        <button className="px-12 py-4 bg-[#0f172a] text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3 active:scale-95 transition-all">
                            <Save size={16} className="text-emerald-400"/> Commit Global Policy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;