import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import {
    ShieldCheck,
    Users,
    Clock,
    AlertTriangle,
    Download,
    Plus,
    ArrowRight,
    Zap,
    Activity,
    Archive
} from 'lucide-react';
import { BarChart, Bar, Cell, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// UI Components
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// Logic, Utilities & Data
import { AuditPackGenerator } from '../../data/auditPackGenerator';
import { ComplianceService } from '../../data/complianceService';
import { EMPLOYEES, APP_CONFIG } from '../../data/mockData';

// Reporting Module
import SMSReportingModule from './SMSReportingModule';

/**
 * NexusHR - Institutional Dashboard
 * Standardized with high-fidelity Midnight Blue contrast and Deep Moss branding.
 */
const Dashboard = () => {
    // State to handle the "Reporting Workflow"
    const [activeBreach, setActiveBreach] = useState(null);

    // Dynamic Data from Compliance Service
    const sponsoredWorkers = EMPLOYEES.filter(e => e.type === 'Sponsored');
    const breaches = ComplianceService.getAbsenceBreaches();
    const upcomingExpiries = ComplianceService.getUpcomingExpiries(90);

    // Dynamic readiness score calculation
    const readinessScore = 100 - (breaches.length * 5);

    const payrollAlignmentData = [
        { month: 'Jan', actual: 3800, threshold: 3475, status: 'Compliant' }, // £41.7k / 12 ≈ £3475
        { month: 'Feb', actual: 3900, threshold: 3475, status: 'Compliant' },
        { month: 'Mar', actual: 3200, threshold: 3475, status: 'Risk' },      // Visual dip below floor
        { month: 'Apr', actual: 4100, threshold: 3475, status: 'Compliant' },
    ];

    const absenceTrendData = [
        { month: 'Jan', total: 40, breaches: 2 },
        { month: 'Feb', total: 45, breaches: 1 },
        { month: 'Mar', total: 38, breaches: 12 },
        { month: 'Apr', total: 48, breaches: breaches.length },
    ];

    /**
     * Institutional Audit Pack Trigger
     */
    const handleExportAudit = () => {
        const firstSponsored = EMPLOYEES.find(e => e.type === 'Sponsored');
        const manifest = AuditPackGenerator.generateManifest(firstSponsored.id);

        alert("🚀 Nexus Intelligence is zipping Institutional Evidence Bundle...");

        setTimeout(() => {
            AuditPackGenerator.downloadAsJSON(manifest);
            alert("✅ Regulatory Archive Generated: " + manifest.bundleId);
        }, 1500);
    };

    // Header Configuration for PageHeader Component
    const headerActions = [
        {
            label: 'Institutional Bundle',
            icon: Download,
            variant: 'secondary',
            onClick: handleExportAudit
        },
        {
            label: 'Assign New CoS',
            icon: Plus,
            variant: 'primary',
            onClick: () => alert("Initiating Certificate of Sponsorship (CoS) Workflow...")
        }
    ];

    const headerStats = [
        { label: 'Total Assets', value: '42' },
        { label: 'Active Sponsored', value: sponsoredWorkers.length.toString() },
        { label: 'Audit Readiness', value: `${readinessScore}%` }
    ];

    /**
     * CONDITIONAL RENDER:
     * If an AO (Authorising Officer) is filing a report, the Dashboard shifts
     * into the SMS Reporting Module.
     */
    if (activeBreach) {
        return (
            <SMSReportingModule
                breach={activeBreach}
                onCancel={() => setActiveBreach(null)}
                onComplete={() => setActiveBreach(null)}
            />
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Posh Page Header - Standardized with Deep Moss background */}
            <PageHeader
                title="Compliance Oversight"
                subtitle="Nexus Predictive Intelligence"
                description="Real-time monitoring of workforce eligibility and regulatory alignment. Automated triggers for UKVI reporting duties are currently active and synchronized with the Institutional Evidence Vault."
                icon={ShieldCheck}
                actions={headerActions}
                stats={headerStats}
            />

            {/* Smart Stats Grid - Updated with Midnight Blue (#0f172a) Icon Backgrounds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Audit Readiness"
                    value={`${readinessScore}%`}
                    icon={ShieldCheck}
                    status="neutral" // Emerald icon in Midnight Blue box
                    trend="+1.2%"
                />
                <StatCard
                    title="Total Sponsored"
                    value={sponsoredWorkers.length}
                    icon={Users}
                    status="neutral"
                />
                <StatCard
                    title="Visa Alerts (90d)"
                    value={upcomingExpiries.length}
                    icon={Clock}
                    status="warning" // Amber icon in Midnight Blue box
                />
                <StatCard
                    title="Active Breaches"
                    value={breaches.length}
                    icon={AlertTriangle}
                    status="danger" // Rose icon in Midnight Blue box
                />
            </div>

            {/* The Intelligence Layer: Critical Breach Panel */}
            {breaches.length > 0 && (
                <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 border-l-[12px] border-l-rose-600 shadow-sm relative overflow-hidden animate-in slide-in-from-left duration-500">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-rose-800 mb-6">
                            <Zap size={20} className="fill-current" />
                            <h3 className="font-black uppercase tracking-widest text-xs">Action Required: UKVI Reporting Duty</h3>
                        </div>
                        <div className="space-y-4">
                            {breaches.map(breach => (
                                <div key={breach.id} className="bg-white p-6 rounded-3xl flex items-center justify-between border border-rose-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-rose-200">
                                            {breach.employee?.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-slate-900 leading-tight">{breach.employee?.name}</p>
                                            <p className="text-[11px] text-rose-600 font-bold uppercase tracking-tight mt-1">
                                                {breach.days} Day Unauthorised Absence (Institutional Breach)
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="danger"
                                        size="md"
                                        icon={ArrowRight}
                                        className="rounded-2xl px-6"
                                        onClick={() => setActiveBreach(breach)}
                                    >
                                        File SMS Report
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Visual Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Global Mobility Intelligence - Posh Light Section */}
                {/* Global Mobility Pipeline - High-Contrast Intelligence */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-12">
                        <div className="space-y-1">
                            <h3 className="text-[11px] font-black text-[#064e3b] uppercase tracking-[0.2em]">Asset Deployment</h3>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Global Mobility Pipeline</h2>
                        </div>
                        <div className="px-4 py-2 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">7 Active Files</span>
                        </div>
                    </div>

                    {/* High-Performance Progress Grid */}
                    <div className="grid grid-cols-1 gap-10">
                        {[
                            { stage: 'Drafting CoS', count: 4, detail: '3 Days Avg', percent: 100, color: 'bg-[#064e3b]' },
                            { stage: 'Visa Processing', count: 2, detail: 'Priority Service', percent: 65, color: 'bg-[#064e3b]/80' },
                            { stage: 'Entry Clearance', count: 1, detail: 'Arrival: Mar 12', percent: 25, color: 'bg-[#0f172a]' }
                        ].map((item, i) => (
                            <div key={i} className="group relative">
                                {/* Header: Stage and Number */}
                                <div className="flex justify-between items-baseline mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[20px] font-black text-slate-900 data-mono">{item.count}</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{item.stage}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                        {item.detail}
                    </span>
                                </div>

                                {/* Progress Bar with "Holographic" Depth */}
                                <div className="relative h-3 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                                    {/* Shadow track for depth */}
                                    <div className="absolute inset-0 shadow-inner rounded-full"></div>
                                    {/* Primary Bar */}
                                    <div
                                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-in-out shadow-lg`}
                                        style={{ width: `${item.percent}%` }}
                                    >
                                        {/* Shimmer effect for "Active" feeling */}
                                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Metric Insights Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency Rate</p>
                            <p className="text-xl font-black text-[#064e3b]">94.2%</p>
                        </div>
                        <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk of Churn</p>
                            <p className="text-xl font-black text-rose-500">Low</p>
                        </div>
                    </div>
                </div>

                {/* Compliance Health - Institutional Midnight Card */}
                <div className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                                <ShieldCheck className="text-emerald-400" size={20} />
                            </div>
                            <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">Compliance Health</h4>
                        </div>

                        <p className="text-2xl font-black leading-tight mb-4 tracking-tighter">
                            NexusHR has verified <span className="text-emerald-400">100%</span> of Right to Work records.
                        </p>
                        <p className="text-slate-400 text-[11px] font-medium leading-relaxed mb-10">
                            All statutory excuses are maintained via automated 24-hour verification cycles through our government gateway.
                        </p>

                        {/* High-Tech Pillar Status Badges */}
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { label: 'Statutory Excuse', value: 'Maintained', icon: ShieldCheck },
                                { label: 'Regulatory Vault', value: '28/28 Active', icon: Archive },
                                { label: 'SMS Reporting API', value: 'Connected', icon: Activity }
                            ].map((pillar, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-default">
                                    <div className="flex items-center gap-3">
                                        <pillar.icon size={16} className="text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{pillar.label}</span>
                                    </div>
                                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg border border-emerald-400/20">
                        {pillar.value}
                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* The Radial Visa Burn-Down Monitor */}
                    <div className="mt-12 pt-10 border-t border-white/10 relative z-10">
                        <div className="flex items-center gap-8">
                            {/* The Radial Visual */}
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="48" cy="48" r="40"
                                        stroke="currentColor" strokeWidth="8" fill="transparent"
                                        className="text-white/5"
                                    />
                                    <circle
                                        cx="48" cy="48" r="40"
                                        stroke="currentColor" strokeWidth="8" fill="transparent"
                                        strokeDasharray="251.2" strokeDashoffset="45"
                                        strokeLinecap="round"
                                        className="text-emerald-400 transition-all duration-1000"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-lg font-black leading-none">82%</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Left</span>
                                </div>
                            </div>

                            {/* Contextual Intelligence */}
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visa Burn-Down Rate</p>
                                <p className="text-xl font-black text-white leading-none tracking-tighter">Sponsorship Health</p>
                                <div className="flex flex-col gap-1 pt-2">
                                    <p className="text-[9px] font-bold text-emerald-400/80 uppercase">5,102 Total Days Remaining</p>
                                    <p className="text-[9px] font-bold text-slate-500 italic uppercase">Next Critical Renewal: Oct 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;