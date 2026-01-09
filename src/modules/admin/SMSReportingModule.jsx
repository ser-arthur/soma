import React, { useState } from 'react';
import { Send, ShieldAlert, FileText, CheckCircle, ArrowLeft, Info } from 'lucide-react';
import { ComplianceService } from '../../data/complianceService';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

/**
 * SMSReportingModule
 * Purpose: Provides a controlled workflow for Authorising Officers to
 * submit mandatory reports to the Home Office.
 */
const SMSReportingModule = ({ breach, onCancel, onComplete }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFiled, setIsFiled] = useState(false);

    // Get the dynamic draft from our Intelligence Service
    const [reportText, setReportText] = useState(
        ComplianceService.generateSMSDraft(breach)
    );

    const handleFileReport = async () => {
        setIsSubmitting(true);
        // Simulate UKVI API Latency
        setTimeout(() => {
            setIsSubmitting(false);
            setIsFiled(true);
            setTimeout(() => onComplete(), 2000);
        }, 1500);
    };

    if (isFiled) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-emerald-100 animate-in fade-in zoom-in">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Report Successfully Filed</h2>
                <p className="text-slate-500 text-sm">UKVI Confirmation Ref: <span className="data-mono font-bold">SMS-TX-99281</span></p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4">
            <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-nexus-moss font-bold text-xs">
                <ArrowLeft size={16} /> CANCEL REPORTING
            </button>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="bg-rose-600 p-6 text-white flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShieldAlert size={24} /> Mandatory SMS Filing
                        </h2>
                        <p className="text-rose-100 text-xs mt-1">Breach Type: 10-Day Unauthorised Absence</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">Priority: High</Badge>
                </div>

                <div className="p-8 space-y-8">
                    {/* Worker Context */}
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-12 h-12 rounded-xl bg-nexus-moss text-white flex items-center justify-center font-bold">
                            {breach.employee?.name[0]}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{breach.employee?.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                                CoS Ref: {breach.employee?.id} • SOC {breach.employee?.soc}
                            </p>
                        </div>
                    </div>

                    {/* Report Content */}
                    <div className="space-y-3">
                        <label className="label-caps">Institutional Report Draft (Editable)</label>
                        <textarea
                            className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-nexus-indigo focus:bg-white outline-none transition-all leading-relaxed"
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                        />
                        <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl">
                            <Info size={16} className="mt-0.5 shrink-0" />
                            <p className="text-[10px] font-bold leading-normal uppercase">
                                Once submitted, this report becomes part of the immutable compliance audit trail for Home Office inspection.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100">
                        <Button
                            variant="primary"
                            className="w-full py-4 text-base"
                            icon={Send}
                            onClick={handleFileReport}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Syncing with UKVI..." : "Submit Official Report"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SMSReportingModule;